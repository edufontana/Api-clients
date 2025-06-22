import { ClientRepository } from "@/repositories/clients-interface";

export class ListClientByNameService {
  constructor(private clientsRepo: ClientRepository) {}

  async execute(name?: string) {
    if (name) {
      const clients = await this.clientsRepo.findByName(name);
      return clients;
    }

    const clients = await this.clientsRepo.findAll();
    return clients;
  }
} 