import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const favoriteRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.favorite.findMany();
  }),
  toggle: publicProcedure
    .input(
      z.object({ userId: z.string(), bookId: z.string(), assignedAt: z.date() })
    )
    .mutation(async ({ input, ctx }) => {
      const currentLike = await ctx.prisma.favorite.findFirst({
        where: { userId: input.userId, bookId: input.bookId },
      });
      if (!currentLike) {
        return ctx.prisma.favorite.create({
          data: {
            userId: input.userId,
            bookId: input.bookId,
            assignedAt: input.assignedAt,
          },
        });
      } else {
        return ctx.prisma.favorite.delete({
          where: {
            userId_bookId: {
              userId: currentLike.userId,
              bookId: currentLike.bookId,
            },
          },
        });
      }
    }),
});
