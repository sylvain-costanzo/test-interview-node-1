import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private readonly userService: UserService) {
    this.getUserById = this.getUserById.bind(this);
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = Number(req.params.id);

    if (Number.isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user id' });
      return;
    }

    try {
      const user = await this.userService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
