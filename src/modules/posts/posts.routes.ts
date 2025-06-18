import { FastifyInstance } from "fastify";
import { fetchPosts } from "./posts.controller";

export default async function postRoutes(app: FastifyInstance) {
  app.get("/posts", fetchPosts);
}

