import { PrismaClients } from "@/repositories/prisma-clients";
import { DeleteClientService } from "@/services/delete-client";
import { FastifyRequest, FastifyReply } from "fastify";

export async function deleteClient(
  request: FastifyRequest,
  response: FastifyReply
) {
  const { id } = request.params as { id: string };

  const clientRepo = new PrismaClients();
  const deleteService = new DeleteClientService(clientRepo);

  console.log("id", id);

  try {
    await deleteService.execute(id);
    return response.status(204).send();
  } catch (err) {
    if (err instanceof Error) {
      return response.status(404).send({ message: err.message });
    }
    throw err;
  }
}
