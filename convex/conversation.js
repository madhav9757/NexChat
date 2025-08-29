import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./utils";

export const get = query({
    args: {
        id: v.id("conversations")
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
            throw new ConvexError("Conversation Not Found")
        }

        const membership = await ctx.db
            .query("conversationMembers")
            .withIndex("byMemberIdConversationId", (q) => q.eq("memberId", currentUser._id).eq("conversationId", conversation._id))
            .unique();

        if (!membership) {
            throw new ConvexError("You aren't a member of this conversation !");
        }

        const allConversationMemberships = await ctx.db
            .query("conversationMembers")
            .withIndex("byConversationId", (q) => q.eq("conversationId", conversation._id))
            .collect();

        if (!conversation.isGroup) {
            const otherMembership = allConversationMemberships.filter(
                (membership) => membership.memberId !== currentUser._id
            )[0];

            if (!otherMembership) {
                throw new ConvexError("Other member not found");
            }

            const otherMemberDetails = await ctx.db.get(otherMembership.memberId);
            return {
                ...conversation,
                otherMember: {
                    ...otherMemberDetails,
                    lastSeenMessageId: otherMembership.lastSeenMessage
                },
                otherMembers: null
            };
        } else {
            const otherMembers = await Promise.all(
                allConversationMemberships.filter(m => m.memberId !== currentUser._id)).map(async (membership) => {
                    const member = await ctx.db.get(membership.memberId);
                    if(!member){
                        throw new ConvexError("Member not found");
                    }
                    return {
                        username: member.username,
                    }
                }
            )
        }
        return{
            ...conversation,
            otherMembers,
            otherMember
        }
    },
});

export const createGroup = query({
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

        const conversationId = await ctx.db.insert("conversation", {
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