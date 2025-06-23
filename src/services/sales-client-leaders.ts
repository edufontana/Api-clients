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

    // Buscar nome dos clientes
    const clientIds = [maiorVolume?.client_id, maiorMedia?.client_id].filter(Boolean);
    const clients = await prisma.clients.findMany({
      where: { id: { in: clientIds as string[] } },
      select: { id: true, name: true },
    });
    const getClientName = (id: string | undefined) => clients.find(c => c.id === id)?.name || null;

    return {
      maiorVolume: maiorVolume
        ? { ...maiorVolume, client_name: getClientName(maiorVolume.client_id) }
        : null,
      maiorMedia: maiorMedia
        ? { ...maiorMedia, client_name: getClientName(maiorMedia.client_id) }
        : null,
    };
  }
}