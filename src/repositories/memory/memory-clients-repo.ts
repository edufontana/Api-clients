import { Clients } from "generated/prisma";
import { ClientRepository } from "../clients-interface";

export class MemoryClientRepo implements ClientRepository {
  public items: Clients[] = [];

  async create({ birth, email, name, password }: Clients) {
    const client = {
      id: "client 1",
      name: name,
      email,
      password,
      birth,
    };

    this.items.push({ email, birth, id: "client 1", name, password });

    return client;
  }
  async findByEmail(email: string) {
    const client = this.items.find((item) => item.email === email);

    if (!client) {
      return null;
    } else {
      return client;
    }
  }

  async findById(id: string) {
    const client = this.items.find((item) => item.id === id);

    if (!client) {
      return null;
    }
    return client;
  }

  async delete(id: string) {
    const clientIndex = this.items.findIndex((item) => item.id === id);

    if (clientIndex > -1) {
      this.items.splice(clientIndex, 1);
    }
  }

  async findByName(name: string) {
    const clients = this.items.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );

    return clients;
  }

  async update(id: string, data: Partial<Clients>) {
    const clientIndex = this.items.findIndex((item) => item.id === id);

    if (clientIndex === -1) {
      throw new Error("Client not found");
    }

    this.items[clientIndex] = { ...this.items[clientIndex], ...data };

    return this.items[clientIndex];
  }

  async findAll() {
    return this.items;
  }
}
