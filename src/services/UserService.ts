import { HttpError } from '../errors/HttpError';
import { IUserRepository } from '../repositories/UserRepository';

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getUserById(id: number) {
    console.log(`[UserService] Start getUserById id=${id}`);

    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new HttpError(404, 'User not found');
      }

      return user;
    } catch (error) {
      console.error(`[UserService] Error getUserById id=${id}`, error);
      throw error;
    } finally {
      console.log(`[UserService] End getUserById id=${id}`);
    }
  }
}
