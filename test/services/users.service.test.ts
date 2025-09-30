import * as userService from '../../src/services/users.service';

describe('User Service', () => {
  beforeEach(() => {
    // 重置用户数据
    userService.resetUsers();
  });

  it('should create a new user', async () => {
    const user = await userService.create('Alice');
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name', 'Alice');
  });

  it('should find a user by ID', async () => {
    const newUser = await userService.create('Bob');
    const foundUser = await userService.findById(newUser.id);
    expect(foundUser).toEqual(newUser);
  });

  it('should return all users', async () => {
    const user1 = await userService.create('Charlie');
    const user2 = await userService.create('Dave');
    const users = await userService.findAll();
    expect(users).toEqual([user1, user2]);
  });

  it('should update a user', async () => {
    const newUser = await userService.create('Eve');
    const updatedUser = await userService.update(newUser.id, 'Evelyn');
    expect(updatedUser).toHaveProperty('name', 'Evelyn');

    const nonExistentUpdate = await userService.update(999, 'Ghost');
    expect(nonExistentUpdate).toBeNull();
  });

  it('should delete a user', async () => {
    const newUser = await userService.create('Frank');
    const deletedUser = await userService.remove(newUser.id);
    expect(deletedUser).toEqual(newUser);

    const nonExistentDelete = await userService.remove(999);
    expect(nonExistentDelete).toBeNull();
  });
});
