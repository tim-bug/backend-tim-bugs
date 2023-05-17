import type { Request, Response } from 'express';

import { Router } from 'express';

import DivisionRoutes from './division.routes';
import UserLevelRoutes from './userLevel.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 200,
    message: '🎉 Server Connected!',
    time: new Date().getTime(),
  });
});

router.use(DivisionRoutes);
router.use(UserLevelRoutes);

export default router;
