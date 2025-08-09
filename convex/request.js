import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { getUserByClerkId } from "./utils";

export const create = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Get logged-in user identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    // Prevent sending request to yourself
    if (args.email === identity.email) {
      throw new ConvexError("You can't send a friend request to yourself.");
    }

    // Get current user from Clerk ID
    const currentUser = await getUserByClerkId(ctx, identity.subject);
    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    // Find receiver by email
    const receiver = await ctx.db
      .query("users")
      .withIndex("byEmail", (q) => q.eq("email", args.email))
      .first();

    if (!receiver) {
      throw new ConvexError("Receiver not found");
    }

    // Check for existing request: currentUser → receiver
    const requestA = await ctx.db
      .query("requests")
      .withIndex("byReceiverSender", (q) =>
        q.eq("receiver", receiver._id).eq("sender", currentUser._id)
      )
      .first();

    // Check for existing request: receiver → currentUser
    const requestB = await ctx.db
      .query("requests")
      .withIndex("byReceiverSender", (q) =>
        q.eq("receiver", currentUser._id).eq("sender", receiver._id)
      )
      .first();

    if (requestA || requestB) {
      throw new ConvexError("A friend request already exists with this user.");
    }

    // Create new friend request
    const request = await ctx.db.insert("requests", {
      sender: currentUser._id,
      receiver: receiver._id,
    });

    return request;
  },
});
