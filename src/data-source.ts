import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';

export const appDataSource = new DataSource({
  type: 'better-sqlite3',
  database: ':memory:',
  synchronize: true,
  entities: [User],
});

export async function seedDatabase(): Promise<void> {
  const userRepository = appDataSource.getRepository(User);

  await userRepository.save({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
  });
}
