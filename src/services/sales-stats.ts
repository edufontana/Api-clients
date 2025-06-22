import { prisma } from "prisma/utils/prisma";

export class SalesStatsService {
  async execute() {
    const stats = await prisma.sales.groupBy({
      by: ['date'],
      _count: {
        id: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Retorna no formato: [{ date: '2024-06-21', total: 3 }, ...]
    return stats.map(item => ({
      date: item.date,
      total: item._count.id,
    }));
  }
} 