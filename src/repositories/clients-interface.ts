interface createServiceTypes {
  name: string;
  email: string;
  password: string;
  birth: string;
}

export interface ClientRepository {
  create({
    birth,
    email,
    name,
    password,
  }: createServiceTypes): Promise<createServiceTypes>;

  findByEmail(email: string): Promise<createServiceTypes | null>;
  findById(id: string): Promise<createServiceTypes | null>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<createServiceTypes[] | null>;
  update(id: string, data: Partial<createServiceTypes>): Promise<createServiceTypes>;
  findAll(): Promise<createServiceTypes[]>;
  findWithSalesByName(name?: string): Promise<any[]>;
}
