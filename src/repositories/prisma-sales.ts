import { prisma } from "prisma/utils/prisma";
import { SalesRepository } from "./sales-interface";

interface saleServiceTypes {
  client: string;
  date: string;
  value: number;
}

export class PrismaSales implements SalesRepository {
  async create({ client, date, value }: saleServiceTypes) {
    const sale = await prisma.sales.create({
      data: {
        client_id: client,
        date,
        value,
      },
    });

    return sale;
  }
}
