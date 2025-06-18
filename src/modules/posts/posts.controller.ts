import { FastifyRequest, FastifyReply } from "fastify";
import { getAllPosts } from "./posts.service";

export async function fetchPosts(req: FastifyRequest, reply: FastifyReply) {
  try {
    const posts = await getAllPosts();
    return reply.send(posts);
  } catch (err) {
    console.error("❌ Fehler in fetchPosts:", err);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
}

