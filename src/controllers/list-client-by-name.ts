import { PrismaClients } from "@/repositories/prisma-clients";
import { ListClientWithSalesService } from "@/services/list-client-by-name";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function listClientByName(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listByNameQuerySchema = z.object({
    name: z.string().optional(),
  });

  const { name } = listByNameQuerySchema.parse(request.query);

  const clientRepo = new PrismaClients();
  const listService = new ListClientWithSalesService(clientRepo);
  const clients = await listService.execute(name);

  const result = clients.map((client: any) => ({
    info: {
      nomeCompleto: client.name,
      detalhes: {
        email: client.email,
        nascimento: client.birth,
      },
    },
    estatisticas: {
      vendas: client.Sales.map((sale: any) => ({
        data: sale.date,
        valor: sale.value,
      })),
    },
  }));

  return reply.status(200).send({ clientes: result });
} 