import { Request, Response } from 'express';
import * as userSerivice from '../services/users.service';
import { ApiResponse, success, failure } from '../types/api-response';
import type { Users } from '@prisma/client';

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
  try {
    const newUser = await userSerivice.create(req.body.name, req.body.email);
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
  try {
    const user = await userSerivice.update(
      parseInt(req.params.id, 10),
      req.body.name
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
