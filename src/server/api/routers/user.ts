import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),
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
});
