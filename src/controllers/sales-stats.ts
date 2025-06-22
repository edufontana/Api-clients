import { FastifyRequest, FastifyReply } from "fastify";
import { SalesStatsService } from "@/services/sales-stats";

export async function salesStats(request: FastifyRequest, response: FastifyReply) {
  const service = new SalesStatsService();
  const stats = await service.execute();
  return response.status(200).send(stats);
} 