import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const bookRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany({
      select: {
        id: true,
        name: true,
        author: true,
        favorites: true
      }
    });
  }),
  getOne: publicProcedure.input(z.object({ id: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.book.findUnique({
      where: {
        id: input.id
      },
      select: {
        id: true,
        name: true,
        author: true,
      }
    })
  })
});
