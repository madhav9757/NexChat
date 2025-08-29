import { ConvexError, v } from "convex/values";
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

        const friendships1 = await ctx.db
            .query("friends")
            .withIndex("byUser1", (q) => q.eq("user1", currentUser._id))
            .collect();
        const friendships2 = await ctx.db
            .query("friends")
            .withIndex("byUser2", (q) => q.eq("user2", currentUser._id))
            .collect();
        const friendships = [...friendships1, ...friendships2];

        const friends = await Promise.all(
            friendships.map(async (friendship) => {
               const friend = await ctx.db.get(friendship.user1 === currentUser._id ? friendship.user2 : friendship.user1);

               if(!friend){
                throw new ConvexError("Friend Not Found!");
               }

               return friend;
            })
        );

    },
});

