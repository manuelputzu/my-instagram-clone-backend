// reels.routes.ts
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { reelsService } from "./reels.service";

// Define a type for the request body
type CreateReelBody = {
  mov_url: string;
  caption: string;
};

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = reelsService(fastify);

  // GET /reels/grid
  fastify.get("/reels/grid", async (_request, reply) => {
    const reels = await service.getAll();
    reply.send(reels);
  });

  // POST /reels
  fastify.post<{ Body: CreateReelBody }>("/reels", async (request, reply) => {
    const newReel = await service.create(request.body);
    return reply.code(201).send(newReel);
  });
};

export default reelsRoutes;