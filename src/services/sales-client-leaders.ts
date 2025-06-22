import { prisma } from "prisma/utils/prisma";

export class SalesClientLeadersService {
  async execute() {
    // 1. Cliente com maior volume de vendas (soma dos valores)
    const [maiorVolume] = await prisma.sales.groupBy({
      by: ['client_id'],
      _sum: { value: true },
      orderBy: { _sum: { value: 'desc' } },
      take: 1,
    });

    // 2. Cliente com maior média de valor por venda
    const [maiorMedia] = await prisma.sales.groupBy({
      by: ['client_id'],
      _avg: { value: true },
      orderBy: { _avg: { value: 'desc' } },
      take: 1,
    });


    return {
      maiorVolume,
      maiorMedia,
    };
  }
}