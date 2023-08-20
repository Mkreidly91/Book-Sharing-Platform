import { register, login } from './auth.controller';
import {
  followUser,
  postBook,
  likeBook,
  getAllFollowed,
} from './user.controller';
import { search, discoverBooks } from './book.controller';

export {
  register,
  login,
  followUser,
  postBook,
  likeBook,
  search,
  discoverBooks,
  getAllFollowed,
};
