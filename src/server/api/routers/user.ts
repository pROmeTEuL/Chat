import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ name: z.string(), email: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.user.create({
                data: {
                    name: input.name,
                    email: input.email
                }
            })
        })
})