import { MemoryClientRepo } from "@/repositories/memory/memory-clients-repo";
import { expect, describe, it, beforeEach } from "vitest";
import { AuthService } from "./auth";
import { hash } from "bcryptjs";
import { ClientRepository } from "@/repositories/clients-interface";

let clientRepository: ClientRepository;
let sut: AuthService;

describe("Create Service", () => {
  beforeEach(() => {
    clientRepository = new MemoryClientRepo();
    sut = new AuthService(clientRepository);
  });

  it("should be able to authenticate", async () => {
    await clientRepository.create({
      name: "carlos",
      password: await hash("123456", 6),
      birth: "12/12/1990",
      email: "test@gmail.com",
    });

    const { client } = await sut.execute({
      email: "test@gmail.com",
      password: "123456",
    });

    await expect(client.name).toBe("carlos");
  });
});
