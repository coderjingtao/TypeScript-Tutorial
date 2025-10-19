import request from 'supertest';
import app from '../../src/server';
import { prisma } from '../../src/config/prisma-client';

beforeEach(async () => {
  await prisma.users.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Test Users API', () => {
  it('should return an array of users (GET /api/users)', async () => {
    // 先插入两个用户
    await prisma.users.create({ data: { name: 'A', email: 'a@email.com' } });
    await prisma.users.create({ data: { name: 'B', email: 'b@email.com' } });
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(2);
  });

  it('should create a new user (POST /api/users)', async () => {
    const newUser = { name: 'John Doe', email: 'john@email.com' };
    const response = await request(app).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.name).toBe(newUser.name);
    expect(response.body.data.email).toBe(newUser.email);
  });

  it('should return a user by ID (GET /api/users/:id)', async () => {
    const user = await prisma.users.create({
      data: { name: 'Tom', email: 'tom@email.com' },
    });
    const response = await request(app).get(`/api/users/${user.id}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id', user.id);
    expect(response.body.data.name).toBe('Tom');
    expect(response.body.data.email).toBe('tom@email.com');

    // 查询不存在用户
    const res404 = await request(app).get('/api/users/99999');
    expect(res404.status).toBe(404);
    expect(res404.body).toHaveProperty('message', 'User not found');
  });

  it('should update a user (PUT /api/users/:id)', async () => {
    const user = await prisma.users.create({
      data: { name: 'Old', email: 'old@email.com' },
    });
    const updatedUser = { name: 'Jane Doe' };
    const response = await request(app)
      .put(`/api/users/${user.id}`)
      .send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id', user.id);
    expect(response.body.data.name).toBe(updatedUser.name);

    // 更新不存在用户
    const res404 = await request(app).put('/api/users/99999').send(updatedUser);
    expect(res404.status).toBe(404);
    expect(res404.body).toHaveProperty('message', 'User not found');
  });

  it('should delete a user (DELETE /api/users/:id)', async () => {
    const user = await prisma.users.create({
      data: { name: 'Del', email: 'del@email.com' },
    });
    const response = await request(app).delete(`/api/users/${user.id}`);
    expect([204, 404]).toContain(response.status);

    // 删除不存在用户
    const res404 = await request(app).delete('/api/users/99999');
    expect([204, 404]).toContain(res404.status);
  });
});
