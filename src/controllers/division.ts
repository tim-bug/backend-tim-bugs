import type { Request, Response, NextFunction } from 'express';
import {
  addDivision,
  findExistingDivisionService,
  getAllDivsions,
  getDivsionById,
  softDeleteDivisionById,
  updateDivsionById,
} from '../services/division.service';

import {
  DivisionPayloadSchema,
  DivisionSoftDeletePayloadSchema,
} from '../validators/division.validator';

export default class Division {
  static async getAllDivisions(req: Request, res: Response, next: NextFunction) {
    try {
      const apps = await getAllDivsions(10);

      if (!apps?.length) {
        return res.status(404).json({
          status: 'not found',
          code: 404,
          message: 'Oops! Divisi tidak ditemukan',
          time: new Date().getTime(),
        });
      }

      const filteredResult = apps?.map((app) => ({
        id: app.id,
        name: app.name,
        is_deleted: app.is_deleted,
      }));

      return res.status(200).json({
        status: 'success',
        code: 200,
        data: filteredResult,
        message: 'Division successfully retrieved',
        time: new Date().getTime(),
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getAllDivisionById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const app = await getDivsionById(id);

      if (!app) {
        return res.status(404).json({
          status: 'not found',
          code: 404,
          message: 'Oops! Division not found',
          time: new Date().getTime(),
        });
      }

      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          id: app.id,
          name: app.name,
          is_deleted: app.is_deleted,
        },
        message: 'Division successfully retrieved',
        time: new Date().getTime(),
      });
    } catch (error) {
      return next(error);
    }
  }

  static async addDivision(req: Request, res: Response, next: NextFunction) {
    try {
      const checkDivisionValidate = await DivisionPayloadSchema.validateAsync(req.body);
      const existingDivision = await findExistingDivisionService(checkDivisionValidate.name);
      if (existingDivision) {
        return res.status(409).json({
          status: 'error',
          code: 409,
          message: 'Oops! Division already exists',
          time: new Date().getTime(),
        });
      }
      const apps = await addDivision({
        ...checkDivisionValidate,
      });

      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          name: apps?.name,
          is_deleted: apps?.is_deleted,
        },
        message: 'Division successfully added',
        time: new Date().getTime(),
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateDivision(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const checkDivisionValidate = await DivisionPayloadSchema.validateAsync(req.body);

      const apps = await updateDivsionById(id, {
        ...checkDivisionValidate,
      });

      if (!apps) {
        return res.status(404).json({
          status: 'not found',
          code: 404,
          message: 'Oops! Division not found',
          time: new Date().getTime(),
        });
      }

      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Application successfully updated',
        time: new Date().getTime(),
      });
    } catch (error) {
      return next(error);
    }
  }

  static async softDeleteDivision(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const checkDivisionValidate = await DivisionSoftDeletePayloadSchema.validateAsync(req.body);

      const app = await softDeleteDivisionById(id, {
        is_deleted: checkDivisionValidate.is_deleted,
        deleted_at: new Date(),
      });

      if (!app) {
        return res.status(404).json({
          status: 'not found',
          code: 404,
          message: 'Oops! Application not found',
          time: new Date().getTime(),
        });
      }

      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Application successfully deleted',
        time: new Date().getTime(),
      });
    } catch (error) {
      return next(error);
    }
  }
}
