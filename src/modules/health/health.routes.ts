import { FastifyInstance } from 'fastify';
import { getHealth } from './health.controller';

export default async function healthRoutes(server: FastifyInstance) {
  server.get('/health', (_request, reply) => {
    reply.send(getHealth());
  });
}
