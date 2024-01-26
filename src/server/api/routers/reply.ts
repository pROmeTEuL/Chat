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
});
