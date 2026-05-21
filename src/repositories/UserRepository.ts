import { Repository } from 'typeorm';
import { User } from '../entities/User';

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  constructor(private readonly repository: Repository<User>) {}

  async findById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }
}
