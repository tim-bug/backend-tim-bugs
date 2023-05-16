import type { Division } from '@prisma/client';
import type { SoftDeletePayload } from '../types';
import { db } from '../utils/db';

export const addDivision = async (payload: Division): Promise<Division> => {
  const res = await db.division.create({
    data: payload,
  });

  return res;
};

export const getAllDivsions = async (limit: number): Promise<Division[]> => {
  const res = await db.division.findMany({
    take: limit,
  });

  return res;
};

export const getDivsionById = async (id: string): Promise<Division | null> => {
  const res = await db.division.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return res;
};

export const updateDivsionById = async (
  id: string,
  payload: Division,
): Promise<Division | null> => {
  const res = await db.division.update({
    where: {
      id: parseInt(id),
    },
    data: payload,
  });

  return res;
};

export const softDeleteDivisionById = async (id: string, payload: SoftDeletePayload) => {
  const res = await db.division.update({
    where: {
      id: parseInt(id),
    },
    data: {
      is_deleted: payload.is_deleted,
      deleted_at: payload.deleted_at,
    },
  });

  return res;
};

export const findExistingDivisionService = async (Division: string): Promise<Division | null> => {
  const res = await db.division.findUnique({
    where: {
      name: Division,
    },
  });

  return res;
};
