import { prisma } from '../config/prisma-client';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

export const findAll = async () => {
  return prisma.users.findMany();
};

export const findById = async (id: number) => {
  return prisma.users.findUnique({
    where: { id },
  });
};

export const create = async (name: string) => {
  const newUser = {
    id: users.length + 1,
    name,
  };
  users.push(newUser);
  return newUser;
};

export const update = async (id: number, name: string) => {
  const user = users.find((u) => u.id === id);
  if (user) {
    user.name = name || user.name;
    return user;
  }
  return null;
};

export const remove = async (id: number) => {
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    return deletedUser;
  }
  return null;
};

export const resetUsers = () => {
  users.length = 0;
};
