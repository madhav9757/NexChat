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
            conversations.map(async (conversation, index) => {
                const allConversationMemberships = await ctx.db
                    .query("conversationMembers")
                    .withIndex("byConversationId", (q) =>
                        q.eq("conversationId", conversation._id)
                    )
                    .collect();

                const lastMessage = await getLastMessageDetails(ctx, conversation.lastMessageId);

                const lastSeenMessage = conversationMemberships[index].lastSeenMessage ?
                    await ctx.db.get(conversationMemberships[index].lastSeenMessage) : null;

                const lastSeenMessageTime = lastSeenMessage ? lastSeenMessage._creationTime : -1;

                const unseenMessages = await ctx.db
                    .query("messages")
                    .withIndex("byConversationId", (q) =>
                        q.eq("conversationId", conversation._id)
                    )
                    .filter((q) => q.gt(q.field("_creationTime"), lastSeenMessageTime))
                    .filter((q) => q.neq(q.field("senderId"), currentUser._id))
                    .collect();

                if (conversation.isGroup) {
                    return { conversation, members: allConversationMemberships, lastMessage, unseenCount: unseenMessages.length };
                } else {
                    const otherMembership = allConversationMemberships.filter(
                        (membership) => membership.memberId !== currentUser._id
                    )[0];

                    if (!otherMembership) {
                        throw new ConvexError("Other member not found");
                    }

                    const otherMember = await ctx.db.get(otherMembership.memberId);
                    return { conversation, otherMember, lastMessage, unseenCount: unseenMessages.length };
                }
            })
        );

        return conversationWithDetails;
    },
});

const getLastMessageDetails = async (ctx, id) => {
    if (!id) return null;

    const message = await ctx.db.get(id);
    if (!message) return null;

    const sender = await ctx.db.get(message.senderId);
    if (!sender) return null;

    const content = getMessageContent(message.type, message.content);

    return {
        content,
        sender: sender.username
    };
};

const getMessageContent = (type, content) => {
    switch (type) {
        case "text":
            return content;
        default:
            return "[Non-text]";
    }
};