import { ClientRepository } from "@/repositories/clients-interface";
import { hash } from "bcryptjs";

interface createServiceTypes {
  name: string;
  email: string;
  password: string;
  birth: string;
}

export class CreateService {
  constructor(private clientsRepo: ClientRepository) {}

  async execute({ birth, email, name, password }: createServiceTypes) {
    console.log(email);
    const crypt_password = await hash(password, 6);

    const userSameEmail = await this.clientsRepo.findByEmail(email);

    console.log(userSameEmail);

    if (userSameEmail) {
      throw new Error("email já existe");
    }

    const client = await this.clientsRepo.create({
      birth,
      email,
      name,
      password: crypt_password,
    });

    return { client };
  }
}
