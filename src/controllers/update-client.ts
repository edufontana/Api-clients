import { PrismaClients } from "@/repositories/prisma-clients";
import { UpdateClientService } from "@/services/update-client";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function updateClient(request: FastifyRequest, reply: FastifyReply) {
  const updateClientParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const updateClientBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    birth: z.string().optional(),
    password: z.string().min(6).optional(),
  });

  const { id } = updateClientParamsSchema.parse(request.params);
  const data = updateClientBodySchema.parse(request.body);

  const clientRepo = new PrismaClients();
  const updateService = new UpdateClientService(clientRepo);

  try {
    const updatedClient = await updateService.execute({ id, data });
    return reply.status(200).send(updatedClient);
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
} 