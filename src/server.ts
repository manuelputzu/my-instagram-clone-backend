import Fastify from "fastify";
import healthRoutes from './modules/health/health.routes';
import { databasePlugin } from "./core/database/database.plugin";
import postsRoutes from "./modules/posts/posts.routes";
import reelsRoutes from "./modules/reels/reels.routes";

const fastify = Fastify();

//register health route
fastify.register(healthRoutes);
// Register database plugin
fastify.register(databasePlugin);
// Register new posts routes
fastify.register(postsRoutes);
// register /reels/grid route
fastify.register(reelsRoutes);


// Declare a default route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "Tom" });
});

const port = 3000;

fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});