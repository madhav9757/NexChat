import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./utils";

export const removeFriend = mutation({
    args: {
        conversationId: v.id("conversations")
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

        const conversation = await ctx.db.get(args.conversationId);

        if (!conversation) {
            throw new ConvexError("Conversation Not Found!");
        }

        const memberships = await ctx.db
            .query('conversationMembers')
            .withIndex('byConversationId', q => q.eq('conversationId', args.conversationId))
            .collect();

        if (!memberships || memberships.length !== 2) {
            throw new ConvexError("This conversattion does not have any members");
        }

        const friendship = await ctx.db
            .query('friends')
            .withIndex('byConversationId', q => q.eq('conversationId', args.conversationId))
            .unique();

        if (!friendship) {
            throw new ConvexError("Friend not found!");
        }

        const messages = await ctx.db
            .query('messages')
            .withIndex('byConversationId', q => q.eq('conversationId', args.conversationId))
            .collect();

        await ctx.db.delete(args.conversationId);
        await ctx.db.delete(friendship._id);

        await Promise.all(memberships.map(async membership => await ctx.db.delete(membership._id)));
        await Promise.all(messages.map(async message => await ctx.db.delete(message._id)));
    }
})