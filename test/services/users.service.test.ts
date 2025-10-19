import * as userService from '../../src/services/users.service';
import { prisma } from '../../src/config/prisma-client';

beforeEach(async () => {
  // 清空数据库，保证每个测试用例独立
  await prisma.users.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('User Service', () => {
  it('should create a new user', async () => {
    const user = await userService.create('Alice', 'alice@hotmail.com');
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@hotmail.com');
  });

  it('should find a user by ID', async () => {
    const newUser = await userService.create('Bob', 'bob@qq.com');
    const foundUser = await userService.findById(newUser.id);
    expect(foundUser).not.toBeNull();
    expect(foundUser?.id).toBe(newUser.id);
    expect(foundUser?.name).toBe('Bob');
    expect(foundUser?.email).toBe('bob@qq.com');
  });

  it('should return all users', async () => {
    const user1 = await userService.create('Charlie', 'charlie@email.com');
    const user2 = await userService.create('Dave', 'dave@email.com');
    const users = await userService.findAll();
    // 按ID排序，保证顺序
    const sorted = users.sort((a, b) => a.id - b.id);
    expect(sorted.length).toBe(2);
    expect(sorted[0].name).toBe('Charlie');
    expect(sorted[1].name).toBe('Dave');
  });

  it('should update a user', async () => {
    const newUser = await userService.create('Eve', 'eve@email.com');
    const updatedUser = await userService.update(newUser.id, 'Evelyn');
    expect(updatedUser).not.toBeNull();
    expect(updatedUser).not.toBeNull();
    expect(updatedUser!.name).toBe('Evelyn');

    // Prisma update 如果找不到会抛异常
    await expect(userService.update(99999, 'Ghost')).rejects.toThrow();
  });

  it('should delete a user', async () => {
    const newUser = await userService.create('Frank', 'frank@email.com');
    const deletedUser = await userService.remove(newUser.id);
    expect(deletedUser).not.toBeNull();
    expect(deletedUser!.id).toBe(newUser.id);
    expect(deletedUser!.name).toBe('Frank');

    // Prisma delete 如果找不到会抛异常
    await expect(userService.remove(99999)).rejects.toThrow();
  });
});
