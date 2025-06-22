import { ClientRepository } from "@/repositories/clients-interface";
import { compare } from "bcryptjs";

interface AuthRequest {
  email: string;
  password: string;
}

interface createServiceTypes {
  name: string;
  email: string;
  password: string;
  birth: string;
}

interface AuthResponde {
  client: createServiceTypes;
}

export class AuthService {
  constructor(private clientRepo: ClientRepository) {}

  async execute({ email, password }: AuthRequest): Promise<AuthResponde> {
    const client = await this.clientRepo.findByEmail(email);
    if (!client) {
      throw Error("Invalid data");
    }

    const passwordMatches = await compare(password, client.password);

    if (!passwordMatches) {
      throw Error("Invalid data");
    }

    return { client };
  }
}
