import express from 'express';
import userRoute from './user.route';

const router = express.Router();

export default (): express.Router => {
  userRoute(router);
  return router;
};
