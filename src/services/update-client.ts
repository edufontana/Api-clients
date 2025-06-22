import { ClientRepository } from "@/repositories/clients-interface";

interface UpdateClientServiceRequest {
  id: string;
  data: {
    name?: string;
    email?: string;
    birth?: string;
    password?: string;
  };
}

export class UpdateClientService {
  constructor(private clientsRepo: ClientRepository) {}

  async execute({ id, data }: UpdateClientServiceRequest) {
    const client = await this.clientsRepo.findById(id);

    if (!client) {
      throw new Error("Cliente não encontrado.");
    }

    const updatedClient = await this.clientsRepo.update(id, data);

    return updatedClient;
  }
} 