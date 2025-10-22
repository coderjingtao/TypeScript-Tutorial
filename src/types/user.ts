export type User = {
  id: number;
  name: string;
};

import { z } from 'zod';

export const userCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().refine(
    (value) => {
      // 使用正则表达式验证邮箱
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value);
    },
    { message: 'Invalid email address' }
  ),
});

export const userUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
});
