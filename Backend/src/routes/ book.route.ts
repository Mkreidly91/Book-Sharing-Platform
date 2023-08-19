import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { search, discoverBooks } from '../controllers';

export default (router: express.Router) => {
  router.get('/book/discover', authMiddleware, discoverBooks);
  router.get('/book/search/', authMiddleware, search);
};
