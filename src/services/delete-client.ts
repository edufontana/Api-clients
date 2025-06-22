import { ClientRepository } from "@/repositories/clients-interface";

export class DeleteClientService {
  constructor(private clientsRepo: ClientRepository) {}

  async execute(id: string) {
    const client = await this.clientsRepo.findById(id);

    if (!client) {
      throw new Error("Cliente não encontrado.");
    }

    await this.clientsRepo.delete(id);
  }
}
