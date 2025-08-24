// convex/messages.js
import { query } from "./_generated/server";

export const getForConversation = query({
  args: { conversationId: v.id("conversations") }, // validate conversationId
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Fetch all messages for this conversation
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("conversationId"), args.conversationId))
      .order("asc") // optional: sort oldest → newest
      .collect();
  },
});
