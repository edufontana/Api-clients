import { prisma } from "prisma/utils/prisma";
import { ClientRepository } from "./clients-interface";

interface createServiceTypes {
  id: string;
  name: string;
  email: string;
  password: string;
  birth: string;
}

export class PrismaClients implements ClientRepository {
  async create({ birth, email, name, password }: createServiceTypes) {
    const client = await prisma.clients.create({
      data: {
        name,
        email,
        password,
        birth,
      },
    });

    return client;
  }

  async findByEmail(email: string) {
    const userSameEmail = await prisma.clients.findUnique({
      where: {
        email,
      },
    });

    return userSameEmail;
  }

  async findById(id: string) {
    const client = await prisma.clients.findUnique({
      where: {
        id,
      },
    });

    return client;
  }

  async delete(id: string) {
    await prisma.clients.delete({
      where: {
        id,
      },
    });
  }

  async findByName(name: string) {
    const clients = await prisma.clients.findMany({
      where: {
        name,
      },
    });

    return clients;
  }

  async update(id: string, data: Partial<createServiceTypes>) {
    const client = await prisma.clients.update({
      where: {
        id,
      },
      data,
    });
    return client;
  }

  async findAll() {
    const clients = await prisma.clients.findMany();
    return clients;
  }

  async findWithSalesByName(name?: string) {
    return await prisma.clients.findMany({
      where: name ? { name: { contains: name } } : {},
      select: {
        id: true,
        name: true,
        email: true,
        birth: true,
        Sales: {
          select: {
            date: true,
            value: true,
          },
        },
      },
    });
  }
}
