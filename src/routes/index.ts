import type { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 200,
    message: '🎉 Server Connected!',
    time: new Date().getTime(),
  });
});

export default router;
