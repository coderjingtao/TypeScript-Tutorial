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
  try {
    return await prisma.users.update({
      where: { id },
      data: { name },
    });
  } catch (error: any) {
    // Prisma throws error if not found
    if (error.code === 'P2025') {
      return null;
    }
    throw error;
  }
};

export const remove = async (id: number) => {
  try {
    return await prisma.users.delete({
      where: { id },
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return null;
    }
    throw error;
  }
};
