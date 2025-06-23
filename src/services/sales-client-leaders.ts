import { prisma } from "prisma/utils/prisma";

export class SalesClientLeadersService {
  async execute() {
 
    const [maiorVolume] = await prisma.sales.groupBy({
      by: ['client_id'],
      _sum: { value: true },
      orderBy: { _sum: { value: 'desc' } },
      take: 1,
    });


    const [maiorMedia] = await prisma.sales.groupBy({
      by: ['client_id'],
      _avg: { value: true },
      orderBy: { _avg: { value: 'desc' } },
      take: 1,
    });


    const sales = await prisma.sales.findMany({
      select: { client_id: true, date: true },
    });
    const freqMap: Record<string, Set<string>> = {};
    for (const sale of sales) {
      if (!freqMap[sale.client_id]) freqMap[sale.client_id] = new Set();
      freqMap[sale.client_id].add(sale.date);
    }
    let maxFreqClientId: string | null = null;
    let maxFreq = 0;
    for (const [clientId, dates] of Object.entries(freqMap)) {
      if (dates.size > maxFreq) {
        maxFreq = dates.size;
        maxFreqClientId = clientId;
      }
    }

 
    const clientIds = [maiorVolume?.client_id, maiorMedia?.client_id, maxFreqClientId].filter(Boolean);
    const clients = await prisma.clients.findMany({
      where: { id: { in: clientIds as string[] } },
      select: { id: true, name: true },
    });
    const getClientName = (id: string | undefined | null) => clients.find(c => c.id === id)?.name || null;

    return {
      maiorVolume: maiorVolume
        ? { ...maiorVolume, client_name: getClientName(maiorVolume.client_id) }
        : null,
      maiorMedia: maiorMedia
        ? { ...maiorMedia, client_name: getClientName(maiorMedia.client_id) }
        : null,
      maiorDiasUnicos: maxFreqClientId
        ? { client_id: maxFreqClientId, client_name: getClientName(maxFreqClientId), diasUnicos: maxFreq }
        : null,
    };
  }
}