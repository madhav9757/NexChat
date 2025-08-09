import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./utils";

export const get = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const currentUser = await getUserByClerkId(ctx, identity.subject);

        if (!currentUser) {
            throw new ConvexError("User Not Found!");
        }

        const requests = await ctx.db
            .query("requests")
            .withIndex("byReceiver", (q) => q.eq("receiver", currentUser._id))
            .collect();

        const requestsWithSender = await Promise.all(
            requests.map(async (request) => {
                const sender = await ctx.db.get(request.sender);

                if (!sender) {
                    throw new ConvexError("Request Sender Could Not Be Found!");
                }

                return { sender, request };
            })
        );

        return requestsWithSender;
    },
});

export const count = query({
    args: {},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const currentUser = await getUserByClerkId(ctx, identity.subject);

        if (!currentUser) {
            throw new ConvexError("User Not Found!");
        }

        const requests = await ctx.db
            .query("requests")
            .withIndex("byReceiver", (q) => q.eq("receiver", currentUser._id))
            .collect();

        return requests.length ;
    },
});