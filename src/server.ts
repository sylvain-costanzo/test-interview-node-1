import { createApp } from './app';
import { UserController } from './controllers/UserController';
import { appDataSource, seedDatabase } from './data-source';
import { User } from './entities/User';
import { UserRepository } from './repositories/UserRepository';
import { UserService } from './services/UserService';

async function bootstrap() {
  await appDataSource.initialize();
  await seedDatabase();

  const userRepository = new UserRepository(appDataSource.getRepository(User));
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  const app = createApp(userController);

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
}

bootstrap().catch((error: unknown) => {
  console.error('[Bootstrap] Failed to start server', error);
  process.exit(1);
});
