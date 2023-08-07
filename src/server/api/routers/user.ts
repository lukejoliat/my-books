import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        age: true,
        favorites: {
          select: {
            book: true,
          },
        },
      },
    });
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          name: true,
          age: true,
          favorites: {
            select: {
              book: true,
            },
          },
        },
      });
    }),
  getOneByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          username: input.name,
        },
        select: {
          id: true,
          name: true,
          age: true,
          favorites: {
            select: {
              book: true,
            },
          },
        },
      });
    }),
});
