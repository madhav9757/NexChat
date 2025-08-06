import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const create = internalMutation({
    args: {
        username: v.string(),
        email: v.string(),
        imgUrl: v.string(),
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("users")
            .withIndex("byClerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (existing) return;

        await ctx.db.insert("users", args);
    },
});

export const get = internalQuery({
    args: { clerkId: v.string() },
    async handler(ctx, args) {
        return ctx.db
            .query("users")
            .withIndex("byClerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();
    },
})

