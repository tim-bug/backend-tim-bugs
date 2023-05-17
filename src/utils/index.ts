import { Request, Response } from 'express';
import rateLimitAPI from 'express-rate-limit';

interface APIRateLimit {
  duration: number;
  max: number;
}
export const apiRequestLimit = ({ duration, max }: APIRateLimit) => {
  const valueLimit = {
    windowsMs: duration * 60 * 1000,
    max,
  };

  const apiRateLimit = rateLimitAPI({
    ...valueLimit,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {
      return res.status(429).json({
        status: 'error',
        message: `You sent too many requests. Please wait ${max} minutes then try again.`,
      });
    },
  });

  return apiRateLimit;
};
