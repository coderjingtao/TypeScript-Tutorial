import { Request, Response } from 'express';
import * as userSerivice from '../services/users.service';
// Zod schema 已迁移到 types/user.ts
import { ApiResponse, success, failure } from '../types/api-response';
import type { Users } from '@prisma/client';

import { userCreateSchema, userUpdateSchema } from '../types/user';

export const getAllUsers = async (
  req: Request,
  res: Response<ApiResponse<Users[]>>
) => {
  try {
    const users = await userSerivice.findAll();
    res.json(success(users));
  } catch (error) {
    res.status(500).json(failure('Failed to fetch users', 'USER_FETCH_ERROR'));
  }
};

export const createUser = async (
  req: Request,
  res: Response<ApiResponse<Users>>
) => {
  // 校验请求体
  const result = userCreateSchema.safeParse(req.body);
  if (!result.success) {
    // 获取第一个错误信息
    const firstIssue = result.error.issues[0]?.message || 'Invalid input';
    return res
      .status(400)
      .json(failure(`Validation error: ${firstIssue}`, 'VALIDATION_ERROR'));
  }
  try {
    const { name, email } = result.data;
    const newUser = await userSerivice.create(name, email);
    res.status(201).json(success(newUser, 'User created'));
  } catch (error) {
    res.status(500).json(failure('Failed to create user', 'USER_CREATE_ERROR'));
  }
};

export const getUserById = async (
  req: Request,
  res: Response<ApiResponse<Users>>
) => {
  try {
    const user = await userSerivice.findById(parseInt(req.params.id, 10));
    if (!user) {
      return res.status(404).json(failure('User not found', 'USER_NOT_FOUND'));
    }
    res.json(success(user));
  } catch (error) {
    res.status(500).json(failure('Failed to fetch user', 'USER_FETCH_ERROR'));
  }
};

export const updateUser = async (
  req: Request,
  res: Response<ApiResponse<Users>>
) => {
  // 校验请求体
  const result = userUpdateSchema.safeParse(req.body);
  if (!result.success) {
    const firstIssue = result.error.issues[0]?.message || 'Invalid input';
    return res
      .status(400)
      .json(failure(`Validation error: ${firstIssue}`, 'VALIDATION_ERROR'));
  }
  try {
    // 只在 name 存在时才更新
    if (!result.data.name) {
      return res
        .status(400)
        .json(failure('Name is required for update', 'VALIDATION_ERROR'));
    }
    const user = await userSerivice.update(
      parseInt(req.params.id, 10),
      result.data.name
    );
    if (user) {
      res.json(success(user));
    } else {
      res.status(404).json(failure('User not found', 'USER_NOT_FOUND'));
    }
  } catch (error) {
    res.status(500).json(failure('Failed to update user', 'USER_UPDATE_ERROR'));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response<ApiResponse<Users>>
) => {
  try {
    const deletedUser = await userSerivice.remove(parseInt(req.params.id, 10));
    if (deletedUser) {
      res.status(204).json(success(deletedUser, 'User deleted'));
    } else {
      res.status(404).json(failure('User not found', 'USER_NOT_FOUND'));
    }
  } catch (error) {
    res.status(500).json(failure('Failed to delete user', 'USER_DELETE_ERROR'));
  }
};
