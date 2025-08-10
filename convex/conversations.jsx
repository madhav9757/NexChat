import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./utils";

export const get = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError("Unauthorized");
        }

        const currentUser = await getUserByClerkId(ctx, identity.subject);
        if (!currentUser) {
            throw new ConvexError("User Not Found!");
        }

        const conversationMemberships = await ctx.db
            .query("conversationMembers")
            .withIndex("byMemberId", (q) => q.eq("memberId", currentUser._id))
            .collect();

        const conversations = await Promise.all(
            conversationMemberships.map(async (membership) => {
                const conversation = await ctx.db.get(membership.conversationId);
                if (!conversation) {
                    throw new ConvexError("Conversation could not be found");
                }
                return conversation;
            })
        );

        const conversationWithDetails = await Promise.all(
            conversations.map(async (conversation) => {
                const allConversationMemberships = await ctx.db
                    .query("conversationMembers")
                    .withIndex("byConversationId", (q) =>
                        q.eq("conversationId", conversation._id)
                    )
                    .collect();

                if (conversation.isGroup) {
                    return { conversation, members: allConversationMemberships };
                } else {
                    const otherMembership = allConversationMemberships.filter(
                        (membership) => membership.memberId !== currentUser._id
                    )[0];

                    if (!otherMembership) {
                        throw new ConvexError("Other member not found");
                    }

                    const otherMember = await ctx.db.get(otherMembership.memberId);
                    return { conversation, otherMember };
                }
            })
        );

        return conversationWithDetails;
    },
});
