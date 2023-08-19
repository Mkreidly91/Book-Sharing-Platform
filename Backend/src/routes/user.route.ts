import express from 'express';
import authMiddleware, { AuthRequest } from '../middlewares/auth.middleware';
import { followUser } from '../controllers/user.controller';
export default (router: express.Router) => {
  router.post('/user/follow/:userId', authMiddleware, followUser);
};
