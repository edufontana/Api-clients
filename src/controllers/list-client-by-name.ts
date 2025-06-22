import { PrismaClients } from "@/repositories/prisma-clients";
import { ListClientByNameService } from "@/services/list-client-by-name";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function listClientByName(
  request: FastifyRequest,
  response: FastifyReply
) {
  const listByNameQuerySchema = z.object({
    name: z.string().optional(),
  });

  const { name } = listByNameQuerySchema.parse(request.query);

  const clientRepo = new PrismaClients();
  const listService = new ListClientByNameService(clientRepo);

  const clients = await listService.execute(name);
  return response.status(200).send(clients);
} 