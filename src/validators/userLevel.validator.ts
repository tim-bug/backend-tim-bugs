import type { User_Level as UserLevel } from '@prisma/client';
import type { SoftDeletePayload } from '../types';

import Joi from 'joi';

export const UserLevelPayloadSchema = Joi.object<UserLevel>({
  level: Joi.string().required(),
});

export const UserLevelSoftDeletePayloadSchema = Joi.object<SoftDeletePayload>({
  is_deleted: Joi.boolean().required(),
  deleted_at: Joi.date().required(),
});
