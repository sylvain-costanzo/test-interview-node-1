import express, { Express } from 'express';
import { UserController } from './controllers/UserController';
import { errorHandler } from './middlewares/ErrorHandler';

export function createApp(userController: UserController): Express {
  const app = express();

  app.use(express.json());

  app.get('/users/:id', userController.getUserById);

  app.use(errorHandler);

  return app;
}
