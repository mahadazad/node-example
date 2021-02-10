import { Express, Router } from 'express';

import { router as personRouter } from './person';

export function initRoutes(app: Express) {
  const router = Router();

  router.use('/v1', personRouter);

  app.use(router);
}
