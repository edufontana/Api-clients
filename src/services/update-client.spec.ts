import { MemoryClientRepo } from "@/repositories/memory/memory-clients-repo";
import { expect, describe, it, beforeEach } from "vitest";
import { UpdateClientService } from "./update-client";
import { ClientRepository } from "@/repositories/clients-interface";

let clientRepository: ClientRepository;
let sut: UpdateClientService;

describe("Update Client Service", () => {
  beforeEach(() => {
    clientRepository = new MemoryClientRepo();
    sut = new UpdateClientService(clientRepository);
  });

  it("should be able to update a client", async () => {
    const client = await clientRepository.create({
      name: "carlos",
      birth: "12/12/1995",
      email: "test@gmail.com",
      password: "12324",
    });

    const updated = await sut.execute({
      id: client.id,
      data: { name: "joao" },
    });

    expect(updated.name).toBe("joao");
  });
}); 