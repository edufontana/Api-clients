import { FastifyRequest, FastifyReply } from "fastify";
import { SalesClientLeadersService } from "@/services/sales-client-leaders";

export async function salesClientLeaders(request: FastifyRequest, reply: FastifyReply) {
  const service = new SalesClientLeadersService();
  const result = await service.execute();
  return reply.status(200).send(result);
} 