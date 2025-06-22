import { PrismaSales } from "@/repositories/prisma-sales";
import { SalesService } from "@/services/create-sale";
import { FastifyRequest, FastifyReply } from "fastify";

export async function sale(request: FastifyRequest, response: FastifyReply) {
  const { user_id, value, date } = request.body;
  
  try {
    const clientRepo = new PrismaSales();
    const createServiceSale = new SalesService(clientRepo);

    await createServiceSale.execute({
      clientId: user_id,
      date,
      value,
    });
  } catch (err) {
    console.log(err);
  }

  return response.status(201).send();
}
