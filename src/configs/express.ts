import 'dotenv/config';
import type { Application, Request, Response, NextFunction, ErrorRequestHandler } from 'express';

import cors from 'cors';
import helmet from 'helmet';
import winston from 'winston';
import express from 'express';
import compression from 'compression';

import routes from '../routes';
import createHttpError from 'http-errors';

const createServer = (): Application => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize winston logger
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'core-authentication' },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  // Log all requests
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  // Routers
  app.use('/api', routes);

  // Catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError.NotFound());
  });

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = err.isJoi ? 400 : err.status || 500;

    res.status(statusCode);
    logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method}`);
    res.json({
      status: err.name || 'Error',
      code: statusCode,
      message: err.message || 'Oops! Something went wrong.',
      time: new Date().getTime(),
    });

    next();
  };

  app.use(errorHandler);

  return app;
};

export { createServer };
