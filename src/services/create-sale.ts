import { SalesRepository } from "@/repositories/sales-interface";
import {  Sales } from "generated/prisma";

interface SalesRequest {
  clientId: string;
  value: string;
  date: string;
}

interface SalesResponde {
  sale: Sales;
}

export class SalesService {
  constructor(private saleRepo: SalesRepository) {}

  async execute({
    clientId,
    date,
    value,
  }: SalesRequest): Promise<SalesResponde> {
    const sale = await this.saleRepo.create({ client: clientId, date, value });

    return { sale };
  }
}
