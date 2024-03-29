import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { RouterOutputs } from "~/utils/api";

export type Post = RouterOutputs["post"]["getAll"][0];

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().optional(),
        ownerId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          ownerId: input.ownerId,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany();
  }),

  getTopPosts: publicProcedure
    .input(z.object({ count: z.number() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        take: input.count,
        orderBy: { createdAt: "desc" },
      });
      return posts.sort((a, b) => b.hearts - a.hearts);
    }),

  heartPost: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.post
        .findFirst({ where: { id: input.id } })
        .then(async (post) => {
          if (!post) return;
          await ctx.db.post.update({
            where: { id: input.id },
            data: { hearts: post.hearts + 1 },
          });
        });
    }),
    unheartPost: publicProcedure
    .input(z.object({id: z.string()}))
    .mutation(async ({ctx, input}) => {
      await ctx.db.post
        .findFirst({where: {id: input.id}})
        .then(async (post) => {
          if (!post) return;
          await ctx.db.post.update({
            where: {id: input.id},
            data: { hearts: post.hearts - 1}
          })
        })
    })
});
