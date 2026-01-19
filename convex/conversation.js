import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./utils";

export const get = query({
    args: {
        id: v.id("conversations"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const currentUser = await getUserByClerkId(ctx, identity.subject);

        if (!currentUser) {
            throw new ConvexError("User Not Found!");
        }

        const conversation = await ctx.db.get(args.id);

        if (!conversation) {
            throw new ConvexError("Conversation Not Found");
        }

        const membership = await ctx.db
            .query("conversationMembers")
            .withIndex("byMemberIdConversationId", (q) =>
                q.eq("memberId", currentUser._id).eq("conversationId", conversation._id)
            )
            .unique();

        if (!membership) {
            throw new ConvexError("You aren't a member of this conversation!");
        }

        const allConversationMemberships = await ctx.db
            .query("conversationMembers")
            .withIndex("byConversationId", (q) =>
                q.eq("conversationId", conversation._id)
            )
            .collect();

        // declare both variables up front
        let otherMember = null;
        let otherMembers = null;

        if (!conversation.isGroup) {
            // DM: get single other member
            const otherMembership = allConversationMemberships.find(
                (m) => m.memberId !== currentUser._id
            );

            if (!otherMembership) {
                throw new ConvexError("Other member not found");
            }

            const otherMemberDetails = await ctx.db.get(otherMembership.memberId);
            if (!otherMemberDetails) {
                throw new ConvexError("Other member not found in DB");
            }

            otherMember = {
                ...otherMemberDetails,
                lastSeenMessageId: otherMembership.lastSeenMessage,
            };
        } else {
            // Group: get all other members
            otherMembers = await Promise.all(
                allConversationMemberships
                    .filter((m) => m.memberId !== currentUser._id)
                    .map(async (membership) => {
                        const member = await ctx.db.get(membership.memberId);
                        if (!member) {
                            throw new ConvexError("Member not found");
                        }
                        return {
                            _id: member._id,
                            username: member.username,
                            imgUrl: member.imgUrl,
                        };
                    })
            );
        }

        return {
            ...conversation,
            otherMember,
            otherMembers,
        };
    },
});

export const createGroup = mutation({
    args: {
        name: v.string(),
        members: v.array(v.id("users"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError("Unauthorized");
        }

        const currentUser = await getUserByClerkId(ctx, identity.subject);
        if (!currentUser) {
            throw new ConvexError("User Not Found!");
        }

        const conversationId = await ctx.db.insert("conversations", {
            isGroup: true,
            name: args.name,
        });

        await Promise.all(
            [...args.members, currentUser._id].map(async (memberId) =>
                await ctx.db.insert("conversationMembers", {
                    conversationId,
                    memberId
                })
            )
        );
    }
});

export const deleteGroup = mutation({
    args: {
        conversationId: v.id("conversations")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const currentUser = await getUserByClerkId(ctx, identity.subject);

        if (!currentUser) {
            throw new ConvexError("User Not Found!");
        }

        const conversation = await ctx.db.get(args.conversationId);

        if (!conversation) {
            throw new ConvexError("Conversation Not Found!");
        }

        const memberships = await ctx.db
            .query('conversationMembers')
            .withIndex('byConversationId', q => q.eq('conversationId', args.conversationId))
            .collect();

        if (!conversation.isGroup) {
            throw new ConvexError("This is not a group conversation");
        }

        if (!memberships || memberships.length === 0) {
            throw new ConvexError("This conversation has no members");
        }

        const messages = await ctx.db
            .query('messages')
            .withIndex('byConversationId', q => q.eq('conversationId', args.conversationId))
            .collect();

        await ctx.db.delete(args.conversationId);

        await Promise.all(memberships.map(async membership => await ctx.db.delete(membership._id)));
        await Promise.all(messages.map(async message => await ctx.db.delete(message._id)));
    }
})

export const leaveGroup = mutation({
    args: {
        conversationId: v.id("conversations")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const currentUser = await getUserByClerkId(ctx, identity.subject);

        if (!currentUser) {
            throw new ConvexError("User Not Found!");
        }

        const conversation = await ctx.db.get(args.conversationId);

        if (!conversation) {
            throw new ConvexError("Conversation Not Found!");
        }

        const membership = await ctx.db
            .query('conversationMembers')
            .withIndex('byMemberIdConversationId', q => q.eq('memberId', currentUser._id).eq('conversationId', args.conversationId))
            .unique();

        if (!membership) {
            throw new ConvexError("you are not a member of this conversation");
        }

        await ctx.db.delete(membership._id);
    }
})

export const markRead = mutation({
    args: {
        conversationId: v.id("conversations"),
        messageId: v.id("messages")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const currentUser = await getUserByClerkId(ctx, identity.subject);

        if (!currentUser) {
            throw new ConvexError("User Not Found!");
        }

        const membership = await ctx.db
            .query('conversationMembers')
            .withIndex('byMemberIdConversationId', q => q.eq('memberId', currentUser._id).eq('conversationId', args.conversationId))
            .unique();

        if (!membership) {
            throw new ConvexError("you are not a member of this conversation");
        }

        const lastMessage = await ctx.db.get(args.messageId);

        await ctx.db.patch(membership._id, {
            lastSeenMessage: lastMessage ? lastMessage._id : undefined
        })
    }
})