import type { Request, Response, NextFunction } from 'express';

import {
  UserLevelPayloadSchema,
  UserLevelSoftDeletePayloadSchema,
} from '../validators/userLevel.validator';
import {
  addUserLevel,
  getUserLevelById,
  getAllUserLevels,
  updateUserLevelById,
  findExistingUserLevel,
  recoveryUserLevelById,
  softDeleteUserLevelById,
} from '../services/userLevel.service';

export default class UserLevelController {
  static async getUserLevels(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllUserLevels(10);

      if (!result?.length) {
        return res.status(404).json({
          status: 'not found',
          code: 404,
          message: 'Oops! List User Level not found',
          time: new Date().getTime(),
        });
      }

      const filteredResult = result.map((item) => ({
        level: item.level,
        is_deleted: item.is_deleted,
      }));

      return res.status(200).json({
        status: 'success',
        code: 200,
        data: filteredResult,
        message: 'User Level successfully retrieved',
        time: new Date().getTime(),
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getUserLevelById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const result = await getUserLevelById(id);

      if (!result) {
        return res.status(404).json({
          status: 'not found',
          code: 404,
          message: 'Oops! User Level not found',
          time: new Date().getTime(),
        });
      }

      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          level: result.level,
          is_deleted: result.is_deleted,
        },
        message: 'User Level successfully retrieved',
        time: new Date().getTime(),
      });
    } catch (error) {
      return next(error);
    }
  }

  static async addUserLevel(req: Request, res: Response, next: NextFunction) {
    try {
      const checkUserLevelValidate = await UserLevelPayloadSchema.validateAsync(req.body);

      const existingUserLevel = await findExistingUserLevel(checkUserLevelValidate.level);
      if (existingUserLevel) {
        return res.status(409).json({
          status: 'error',
          code: 409,
          message: 'Oops! User Level already exists',
          time: new Date().getTime(),
        });
      }

      const result = await addUserLevel({
        ...checkUserLevelValidate,
      });

      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          level: result.level,
          is_deleted: result.is_deleted,
        },
        message: 'User Level successfully added',
        time: new Date().getTime(),
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateUserLevel(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const checkUserLevelValidate = await UserLevelPayloadSchema.validateAsync(req.body);

      const result = await updateUserLevelById(id, {
        ...checkUserLevelValidate,
      });

      if (!result) {
        return res.status(404).json({
          status: 'not found',
          code: 404,
          message: 'Oops! User Level not found',
          time: new Date().getTime(),
        });
      }

      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'User Level successfully updated',
        time: new Date().getTime(),
      });
    } catch (error) {
      return next(error);
    }
  }

  static async softDeleteUserLevelById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const checkUserLevelValidate = await UserLevelSoftDeletePayloadSchema.validateAsync(req.body);

      const result = await softDeleteUserLevelById(id, {
        is_deleted: checkUserLevelValidate.is_deleted,
        deleted_at: new Date(),
      });

      if (!result) {
        return res.status(404).json({
          status: 'not found',
          code: 404,
          message: 'Oops! User Level not found',
          time: new Date().getTime(),
        });
      }

      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'User Level successfully deleted',
        time: new Date().getTime(),
      });
    } catch (error) {
      return next(error);
    }
  }

  static async recoveryUserLevelById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const result = await recoveryUserLevelById(id);

      if (!result) {
        return res.status(404).json({
          status: 'not found',
          code: 404,
          message: 'Oops! User Level not found',
          time: new Date().getTime(),
        });
      }

      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'User Level successfully recovered',
        time: new Date().getTime(),
      });
    } catch (error) {
      return next(error);
    }
  }
}
