import { Sales } from "generated/prisma";

interface saleServiceTypes {
  client: string;
  date: string;
  value: number;
}

export interface SalesRepository {
  create({ client, date, value }: saleServiceTypes): Promise<Sales>;
}
