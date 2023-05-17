import type { User_Level as UserLevel } from '@prisma/client';
import type { SoftDeletePayload } from '../types';

import { db } from '../configs/db';

export const getAllUserLevels = async (limit: number): Promise<UserLevel[]> => {
  const res = await db.user_Level.findMany({
    take: limit,
  });

  return res;
};

export const getUserLevelById = async (id: string): Promise<UserLevel | null> => {
  const res = await db.user_Level.findUnique({
    where: {
      id: Number(id),
    },
  });

  return res;
};

export const addUserLevel = async (payload: UserLevel): Promise<UserLevel> => {
  const res = await db.user_Level.create({
    data: payload,
  });

  return res;
};

export const updateUserLevelById = async (
  id: string,
  payload: UserLevel,
): Promise<UserLevel | null> => {
  const res = await db.user_Level.update({
    where: {
      id: Number(id),
    },
    data: payload,
  });

  return res;
};

export const softDeleteUserLevelById = async (id: string, payload: SoftDeletePayload) => {
  const res = await db.user_Level.update({
    where: {
      id: Number(id),
    },
    data: {
      is_deleted: payload.is_deleted,
      deleted_at: payload.deleted_at,
    },
  });

  return res;
};

export const recoveryUserLevelById = async (id: string) => {
  const res = await db.user_Level.update({
    where: {
      id: Number(id),
    },
    data: {
      is_deleted: false,
      deleted_at: null,
    },
  });

  return res;
};

export const findExistingUserLevel = async (level: string): Promise<UserLevel | null> => {
  const res = await db.user_Level.findUnique({
    where: {
      level,
    },
  });

  return res;
};
