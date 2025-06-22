import { MemoryClientRepo } from "@/repositories/memory/memory-clients-repo";
import { expect, describe, it, beforeEach } from "vitest";
import { ListClientByNameService } from "./list-client-by-name";
import { ClientRepository } from "@/repositories/clients-interface";

let clientRepository: ClientRepository;
let sut: ListClientByNameService;

describe("List Client By Name Service", () => {
  beforeEach(() => {
    clientRepository = new MemoryClientRepo();
    sut = new ListClientByNameService(clientRepository);
  });

  it("should return clients matching the name", async () => {
    await clientRepository.create({
      name: "carlos",
      birth: "12/12/1995",
      email: "carlos@gmail.com",
      password: "12324",
    });
    await clientRepository.create({
      name: "joao",
      birth: "01/01/1990",
      email: "joao@gmail.com",
      password: "12324",
    });

    const clients = await sut.execute("carlos");
    expect(clients.length).toBe(1);
    expect(clients[0].name).toBe("carlos");
  });

  it("should return all clients if no name is provided", async () => {
    await clientRepository.create({
      name: "carlos",
      birth: "12/12/1995",
      email: "carlos@gmail.com",
      password: "12324",
    });
    await clientRepository.create({
      name: "joao",
      birth: "01/01/1990",
      email: "joao@gmail.com",
      password: "12324",
    });

    const clients = await sut.execute();
    expect(clients.length).toBe(2);
  });
}); 