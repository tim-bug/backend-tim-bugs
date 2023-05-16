import type { SoftDeletePayload } from '../types';
import { Division } from '@prisma/client';
import Joi from 'joi';

export const DivisionPayloadSchema = Joi.object<Division>({
  name: Joi.string().required(),
});
export const DivisionSoftDeletePayloadSchema = Joi.object<Omit<SoftDeletePayload, 'deleted_at'>>({
  is_deleted: Joi.boolean().required(),
});
