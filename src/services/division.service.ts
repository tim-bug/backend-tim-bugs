import type { Division } from '@prisma/client';
import type { SoftDeletePayload } from '../types';

import { db } from '../configs/db';

export const addDivision = async (payload: Division): Promise<Division> => {
  const res = await db.division.create({
    data: payload,
  });

  return res;
};

export const getAllDivisions = async (limit: number): Promise<Division[]> => {
  const res = await db.division.findMany({
    take: limit,
  });

  return res;
};

export const getDivisionById = async (id: string): Promise<Division | null> => {
  const res = await db.division.findUnique({
    where: {
      id: Number(id),
    },
  });

  return res;
};

export const updateDivisionById = async (
  id: string,
  payload: Division,
): Promise<Division | null> => {
  const res = await db.division.update({
    where: {
      id: Number(id),
    },
    data: payload,
  });

  return res;
};

export const softDeleteDivisionById = async (id: string, payload: SoftDeletePayload) => {
  const res = await db.division.update({
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

export const findExistingDivision = async (name: string): Promise<Division | null> => {
  const res = await db.division.findUnique({
    where: {
      name,
    },
  });

  return res;
};
