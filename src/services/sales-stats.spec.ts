import { SalesStatsService } from "./sales-stats";
import { prisma } from "prisma/utils/prisma";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock do prisma.sales.groupBy
vi.mock("prisma/utils/prisma", () => {
  return {
    prisma: {
      sales: {
        groupBy: vi.fn(),
      },
    },
  };
});

describe("SalesStatsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return sales count per day", async () => {
    const mockStats = [
      { date: "2024-06-01", _count: { id: 2 } },
      { date: "2024-06-02", _count: { id: 1 } },
    ];
    (prisma.sales.groupBy as any).mockResolvedValue(mockStats);

    const service = new SalesStatsService();
    const result = await service.execute();

    expect(result).toEqual([
      { date: "2024-06-01", total: 2 },
      { date: "2024-06-02", total: 1 },
    ]);
  });
}); 