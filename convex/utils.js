export const getUserByClerkId = async (ctx, clerkId) => {
  return await ctx.db
    .query("users")
    .withIndex("byClerkId", (q) => q.eq("clerkId", clerkId))
    .first();
};
