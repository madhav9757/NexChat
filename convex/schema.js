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
        .index("byReceiverSender", ["receiver", "sender"]), // THIS is required
});
