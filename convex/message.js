import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./utils";

export const create = mutation({
    args: {
        conversationId: v.id("conversations"),
        type: v.string(),
        content: v.array(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const currentUser = await getUserByClerkId(ctx, identity.subject);

        if (!currentUser) {
            throw new ConvexError("User Not Found!");
        }

        const membership = await ctx.db
            .query("conversationMembers")
            .withIndex("byMemberIdConversationId", (q) => q.eq("memberId", currentUser._id).eq("conversationId", args.conversationId))
            .unique();

        if (!membership) {
            throw new ConvexError("User is not a member of this conversation");
        }

        // Create the message
        const message = await ctx.db
            .insert("messages", {
                senderId: currentUser._id,
                ...args,
            });
        
        await ctx.db.patch(args.conversationId, {lastMessageId: message});
        
        return message;
    }
})