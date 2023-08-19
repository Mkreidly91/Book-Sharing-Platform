import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import BookRoute from './ book.route';
const router = express.Router();

export default (): express.Router => {
  authRoute(router);
  userRoute(router);
  BookRoute(router);
  return router;
};
