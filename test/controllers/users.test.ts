import request from 'supertest';
import app from '../../src/server';

describe('Test Users API', () => {
  it('should return an array of users (GET /api/users)', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should create a new user (POST /api/users)', async () => {
    const newUser = { name: 'John Doe' };
    const response = await request(app).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.name).toBe(newUser.name);
  });

  it('should return a user by ID (GET /api/users/:id)', async () => {
    const response = await request(app).get('/api/users/1');
    if (response.status === 200) {
      expect(response.body.data).toHaveProperty('id', 1);
    } else {
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    }
  });

  it('should update a user (PUT /api/users/:id)', async () => {
    const updatedUser = { name: 'Jane Doe' };
    const response = await request(app).put('/api/users/1').send(updatedUser);
    if (response.status === 200) {
      expect(response.body.data).toHaveProperty('id', 1);
      expect(response.body.data.name).toBe(updatedUser.name);
    } else {
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'User not found');
    }
  });

  it('should delete a user (DELETE /api/users/:id)', async () => {
    const response = await request(app).delete('/api/users/1');
    expect([204, 404]).toContain(response.status);
  });
});
