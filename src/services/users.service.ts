import { prisma } from '../config/prisma-client';

export const findAll = async () => {
  return prisma.users.findMany();
};

export const findById = async (id: number) => {
  return prisma.users.findUnique({
    where: { id },
  });
};

export const create = async (name: string, email: string) => {
  return prisma.users.create({
    data: {
      name,
      email,
    },
  });
};

export const update = async (id: number, name: string) => {
  return prisma.users.update({
    where: { id },
    data: { name },
  });
};

export const remove = async (id: number) => {
  return prisma.users.delete({
    where: { id },
  });
};
