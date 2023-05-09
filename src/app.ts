import http from 'http';

import { createServer } from './configs/express';
import { logger } from './configs/logger';

const port: number = Number(process.env.PORT) || 8000;

const initServer = async () => {
  const app = createServer();

  const server = http.createServer(app).listen(port, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
  });

  const signalHandler = ['SIGINT', 'SIGTERM', 'SIGQUIT'] as const;

  signalHandler.forEach((signal) => {
    process.once(signal, async () => {
      logger.info(`[server]: Server is shutting down...`);

      server.close(() => {
        logger.debug(`[server]: Server is closed.`);
      });
    });
  });
};

initServer()
  .then(() => {
    logger.info(`[server]: Server is initialized.`);
  })
  .catch((err) => {
    logger.error(`[server]: Server failed to initialize.`, err);
  });
