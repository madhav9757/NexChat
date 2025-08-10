import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        username: v.string(),
        email: v.string(),
        imgUrl: v.string(),
        clerkId: v.string(),
    })
        .index("byClerkId", ["clerkId"])
        .index("byEmail", ["email"]),

    requests: defineTable({
        sender: v.id("users"),
        receiver: v.id("users"),
    })
        .index("byReceiver", ["receiver"])
        .index("byReceiverSender", ["receiver", "sender"]),

    friends: defineTable({
        user1: v.id("users"),
        user2: v.id("users"),
        conversationId: v.id("conversations")
    })
        .index("byUser1", ["user1"])
        .index("byUser2", ["user2"])
        .index("byConversationId", ["conversationId"]),

    conversations: defineTable({
        name: v.optional(v.string()),
        isGroup: v.boolean(),
        lastMessageId: v.optional(v.id("messages")) 
    }),

    conversationMembers: defineTable({
        memberId: v.id("users"),
        conversationId: v.id("conversations"),
        lastSeenMessage: v.optional(v.id("messages"))
    })
        .index("byMemberId", ["memberId"])
        .index("byConversationId", ["conversationId"])
        .index("byMemberIdConversationId", ["memberId","conversationId"]),

    messages: defineTable({
        senderId: v.id("users"),
        conversationId: v.id("conversations"),
        type: v.string(),
        content: v.string()
    })
        .index("byConversationId", ["conversationId"]),

});
