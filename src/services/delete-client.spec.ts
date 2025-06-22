import { MemoryClientRepo } from "@/repositories/memory/memory-clients-repo";
import { expect, describe, it, beforeEach } from "vitest";
import { DeleteClientService } from "./delete-client";
import { ClientRepository } from "@/repositories/clients-interface";

let clientRepository: ClientRepository;
let sut: DeleteClientService;

describe("Delete Client Service", () => {
  beforeEach(() => {
    clientRepository = new MemoryClientRepo();
    sut = new DeleteClientService(clientRepository);
  });

  it("should be able to delete a client", async () => {
    const client = await clientRepository.create({
      name: "carlos",
      birth: "12/12/1995",
      email: "test@gmail.com",
      password: "12324",
    });

    await sut.execute(client.id);
    const found = await clientRepository.findById(client.id);
    expect(found).toBeNull();
  });
}); 