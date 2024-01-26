import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  authenticate: publicProcedure
    .input(z.object({ id: z.string(), name: z.string(), email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      ctx.db.user.findUnique({ where: { id: input.id } }).then((user) => {
        if (user) {
          return user;
        }
        return ctx.db.user.create({
          data: {
            id: input.id,
            name: input.name,
            email: input.email,
          },
        });
      });
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({ where: { id: input.id } });
    }),
});
