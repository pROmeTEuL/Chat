import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const replyRouter = createTRPCRouter({
  createReply: publicProcedure
    .input(
      z.object({ content: z.string(), postId: z.string(), userId: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.reply.create({
        data: {
          content: input.content,
          postId: input.postId,
          ownerId: input.userId,
        },
      });
    }),
  getAllByPost: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.reply.findMany({
        where: {
          postId: input.postId,
        },
      });
    }),
});
