import { Router } from 'express';
import { wrap } from '../utils';
import { passportAuthMiddleware, validateRequest } from '../middlewares';
import { UpdateStatsRequest } from '../requests';
import { StatsController } from '../controllers';
import { JwtTypes } from '../constants';

const statsRouter = Router();

statsRouter.patch(
  '/',
  passportAuthMiddleware(JwtTypes.ACCESS),
  validateRequest(UpdateStatsRequest),
  wrap(async (req, res) => {
    const users = await StatsController.UpdateUser(req.user.id, req.body);
    res.json(users);
  }),
);

export {
  statsRouter,
};
