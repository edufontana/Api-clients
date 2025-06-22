import { PrismaClients } from "@/repositories/prisma-clients";
import { CreateService } from "@/services/create-client";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, response: FastifyReply) {
  const createClientBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    birth: z.string(),
  });

  const { name, email, password, birth } = createClientBodySchema.parse(
    request.body
  );

  try {
    const clientRepo = new PrismaClients();
    const createServiceClient = new CreateService(clientRepo);

    await createServiceClient.execute({
      name,
      email,
      password,
      birth,
    });
  } catch (err) {
    console.log(err);
  }

  return response.status(201).send();
}
