import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import { createConnection, ConnectionOptions } from 'typeorm';
import { createLogger, transports } from 'winston';

require('dotenv').config();

import * as entities from './entities';
import { initRoutes } from './routes';

const PORT = 3000;

const logger = createLogger({
  transports: [new transports.File({ filename: 'error.log' })],
});

async function bootstrap() {
  try {
    const dbConfig: ConnectionOptions = {
      type: 'mysql',
      host: config.get('database.host'),
      port: config.get('database.port'),
      username: config.get('database.user'),
      password: config.get('database.password'),
      database: config.get('database.name'),
      entities: Object.values(entities),
      synchronize: true,
    };

    await createConnection(dbConfig);

    const app = express();

    app.use(bodyParser.json());

    app.use((err: Error, _req: Request, _res: Response, next: NextFunction) => {
      if (err) {
        logger.error(err);
      }
      next();
    });

    initRoutes(app);

    app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT} `));
  } catch (e) {
    console.error(e);
    logger.error(e);
  }
}

bootstrap();
