import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { getUserByClerkId } from "./utils";

/** --------------------
 * CREATE FRIEND REQUEST
 * -------------------- */
export const create = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    if (args.email === identity.email) {
      throw new ConvexError("You can't send a friend request to yourself.");
    }

    const currentUser = await getUserByClerkId(ctx, identity.subject);
    if (!currentUser) throw new ConvexError("User not found");

    const receiver = await ctx.db
      .query("users")
      .withIndex("byEmail", (q) => q.eq("email", args.email))
      .first();

    if (!receiver) throw new ConvexError("No user with that email exists.");

    // Check for existing request in either direction
    const requestA = await ctx.db
      .query("requests")
      .withIndex("byReceiverSender", (q) =>
        q.eq("receiver", receiver._id).eq("sender", currentUser._id)
      )
      .first();

    const requestB = await ctx.db
      .query("requests")
      .withIndex("byReceiverSender", (q) =>
        q.eq("receiver", currentUser._id).eq("sender", receiver._id)
      )
      .first();

    if (requestA || requestB) {
      throw new ConvexError(
        "You already have a pending friend request with this user."
      );
    }

    // Check if already friends
    // Check user1 → user2 direction
    const alreadyFriends = await ctx.db
      .query("friends")
      .withIndex("byUser1", (q) => q.eq("user1", currentUser._id))
      .filter((q) => q.eq(q.field("user2"), receiver._id))
      .first();

    // Check reverse direction
    const alreadyFriendsReverse = await ctx.db
      .query("friends")
      .withIndex("byUser2", (q) => q.eq("user2", currentUser._id))
      .filter((q) => q.eq(q.field("user1"), receiver._id))
      .first();

    if (alreadyFriends || alreadyFriendsReverse) {
      throw new ConvexError("You are already friends with this user.");
    }

    // Create friend request
    const request = await ctx.db.insert("requests", {
      sender: currentUser._id,
      receiver: receiver._id,
    });

    return request;
  },
});

/** --------------------
 * DENY FRIEND REQUEST
 * -------------------- */
export const deny = mutation({
  args: {
    id: v.id("requests"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const currentUser = await getUserByClerkId(ctx, identity.subject);
    if (!currentUser) throw new ConvexError("User not found");

    const request = await ctx.db.get(args.id);
    if (!request) throw new ConvexError("Request not found");

    if (request.receiver !== currentUser._id) {
      throw new ConvexError("You cannot deny this request.");
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});

/** --------------------
 * ACCEPT FRIEND REQUEST
 * -------------------- */
export const accept = mutation({
  args: {
    id: v.id("requests"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const currentUser = await getUserByClerkId(ctx, identity.subject);
    if (!currentUser) throw new ConvexError("User not found");

    const request = await ctx.db.get(args.id);
    if (!request) throw new ConvexError("Request not found");

    if (request.receiver !== currentUser._id) {
      throw new ConvexError("You cannot accept this request.");
    }

    // Create a new conversation
    const conversationId = await ctx.db.insert("conversations", {
      isGroup: false,
    });

    // Add both users as conversation members
    await ctx.db.insert("conversationMembers", {
      memberId: request.sender,
      conversationId,
    });
    await ctx.db.insert("conversationMembers", {
      memberId: request.receiver,
      conversationId,
    });

    // Add as friends
    await ctx.db.insert("friends", {
      user1: request.sender,
      user2: request.receiver,
      conversationId,
    });

    // Remove the request
    await ctx.db.delete(args.id);

    return { success: true, conversationId };
  },
});
