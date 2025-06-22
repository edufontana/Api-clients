import { PrismaClients } from "@/repositories/prisma-clients";
import { AuthService } from "@/services/auth";
import { FastifyRequest, FastifyReply } from "fastify";

export async function auth(request: FastifyRequest, response: FastifyReply) {
  const { email, password } = request.body;

  const clientRepo = new PrismaClients();
  const createAuthClient = new AuthService(clientRepo);

  try {
    const { client } = await createAuthClient.execute({
      email,
      password,
    });

    const tokenJwt = await response.jwtSign(
      {},
      {
        sign: {
          sub: client.id,
        },
      }
    );

    return response.status(201).send({ tokenJwt });
  } catch (err) {
    return response.status(400).send();
  }
}
