import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import {
  followUser,
  postBook,
  likeBook,
  getAllFollowed,
  getAllLiked,
} from '../controllers';

export default (router: express.Router) => {
  router.post('/user/follow/:userId', authMiddleware, followUser);
  router.post('/user/post/', authMiddleware, postBook);
  router.post('/user/like/:bookId', authMiddleware, likeBook);
  router.get('/user/getAllFollowed', authMiddleware, getAllFollowed);
  router.get('/user/getAllLiked', authMiddleware, getAllLiked);
};
