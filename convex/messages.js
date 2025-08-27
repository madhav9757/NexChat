import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./utils";

export const get = query({
  args: {
    id: v.id("conversations")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const currentUser = await getUserByClerkId(ctx, identity.subject);
    if (!currentUser) {
      throw new ConvexError("User Not Found!");
    }

    const membership = await ctx.db
      .query("conversationMembers")
      .withIndex("byMemberIdConversationId", (q) => q.eq("memberId", currentUser._id).eq("conversationId", args.id))
      .unique();

    if (!membership) {
      throw new ConvexError("User is not a member of this conversation");
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("byConversationId", (q) =>
        q.eq("conversationId", args.id)
      )
      .order("desc")
      .collect();

    const messagesWithUsers = await Promise.all(
      messages.map(async (message) => {
        const messageSender = await ctx.db.get(message.senderId);
        if (!messageSender) {
          throw new ConvexError("could not find message sender");
        }

        return {
          message,
          senderImage: messageSender.imgUrl,
          senderName: messageSender.username,
          isCurrentUser: messageSender._id === currentUser._id
        };
      })
    );

    return messagesWithUsers;
  },
});
