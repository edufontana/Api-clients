import { MemoryClientRepo } from "@/repositories/memory/memory-clients-repo";
import { expect, describe, it, beforeEach } from "vitest";
import { CreateService } from "./create-client";
import { ClientRepository } from "@/repositories/clients-interface";

let clientRepository: ClientRepository;
let sut: CreateService;

describe("Create Service", () => {
  beforeEach(() => {
    clientRepository = new MemoryClientRepo();
    sut = new CreateService(clientRepository);
  });

  it("should be able to register a client", async () => {
    const { client } = await sut.execute({
      name: "carlos",
      birth: "12/12/1995",
      email: "test@gmail.com",
      password: "12324",
    });

    await expect(client.name).toBe("carlos");
  });
});
