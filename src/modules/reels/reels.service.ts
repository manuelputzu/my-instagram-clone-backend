//business logic 
import type { CreateReelPayload } from "./reels.types";
import type { FastifyInstance } from "fastify";

export const reelsService = (fastify: FastifyInstance) => {
  return {
    // create a new reel in the database
    create: async (reelData: CreateReelPayload) => {
      console.info(`Creating a new reel`);
      // This will use the MOCK `transactions` in our test,
      // and the REAL `transactions` in our live application.
      const reel = fastify.transactions.reels.create(reelData);
      return reel;
    },
    // Fetch all reels from database
    getAll: async () => {
      fastify.log.info("Fetching all reels");
      const reels = fastify.transactions.reels.getAll();
      return reels;
    }
  };
};