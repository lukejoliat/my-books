import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const favoriteRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.favorite.findMany();
  }),
});
