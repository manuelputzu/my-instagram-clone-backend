import { FastifyInstance } from "fastify";

export async function reelsRoutes(app: FastifyInstance) {
  app.get("/reels/grid", async (request, reply) => {
    const reels = app.transactions.reels.getAll();
    return reply.send(reels);
  });
}
