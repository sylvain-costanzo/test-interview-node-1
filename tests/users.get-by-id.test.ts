import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app';
import { UserController } from '../src/controllers/UserController';
import { User } from '../src/entities/User';
import { UserService } from '../src/services/UserService';

describe('GET /users/:id', () => {
  const userRepositoryMock = {
    findById: vi.fn<(id: number) => Promise<User | null>>(),
  };

  const userService = new UserService(userRepositoryMock);
  const userController = new UserController(userService);
  const app = createApp(userController);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 and a user when id is valid and found', async () => {
    userRepositoryMock.findById.mockResolvedValueOnce({
      id: 1,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });

    const response = await request(app).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(1);
  });

  it('returns 400 when id is not numeric', async () => {
    const response = await request(app).get('/users/not-a-number');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid user id' });
    expect(userRepositoryMock.findById).not.toHaveBeenCalled();
  });

  it('returns 404 when user is missing', async () => {
    userRepositoryMock.findById.mockResolvedValueOnce(null);

    const response = await request(app).get('/users/99');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'User not found' });
  });

  it('returns safe 500 response when an unexpected error occurs', async () => {
    userRepositoryMock.findById.mockRejectedValueOnce(new Error('Database exploded'));

    const response = await request(app).get('/users/2');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal server error' });
    expect(response.text).not.toContain('Database exploded');
  });
});
