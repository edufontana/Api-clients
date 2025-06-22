import { SalesClientLeadersService } from "./sales-client-leaders";
import { prisma } from "prisma/utils/prisma";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock do prisma.sales.findMany
vi.mock("prisma/utils/prisma", () => {
  return {
    prisma: {
      sales: {
        findMany: vi.fn(),
      },
    },
  };
});

describe("SalesClientLeadersService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the correct leaders for volume, media and diasUnicos", async () => {
    const mockSales = [
      { client_id: "1", value: "100", date: "2024-06-01" },
      { client_id: "1", value: "200", date: "2024-06-02" },
      { client_id: "2", value: "300", date: "2024-06-01" },
      { client_id: "2", value: "100", date: "2024-06-03" },
      { client_id: "2", value: "100", date: "2024-06-03" },
    ];
    (prisma.sales.findMany as any).mockResolvedValue(mockSales);

    const service = new SalesClientLeadersService();
    const result = await service.execute();

    expect(result.maiorVolume?.client_id).toBe("2"); // 300+100+100=500
    expect(result.maiorMedia?.client_id).toBe("1"); // (100+200)/2=150
    expect(result.maiorDiasUnicos?.client_id).toBe("2"); // 2 dias únicos
    expect(result.maiorDiasUnicos?.diasUnicos).toBe(2);
  });
}); 