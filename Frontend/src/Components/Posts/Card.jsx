import React, { useEffect, useState } from 'react';
import Button from '../Common/Button';
import profile from '../../assets/images/profile.png';
import heartEmpty from '../../assets/icons/heart-empty.svg';
import heartFull from '../../assets/icons/heart-full.svg';
import { follow, likeBook } from '../../helpers/user.helpers';

const Card = ({ post, cardState }) => {
  const { book, isFollowing, isLiked } = post;
  const { _id, title, author, picture, genres, review, createdBy } = book;
  console.log(post);
  const { _id: userId, name } = createdBy;

  const [followState, setFollowState] = useState();
  const [likeState, setLikeState] = useState();
  useEffect(() => {
    setFollowState(isFollowing);
    setLikeState(isLiked);
  }, []);
  console.log(followState);
  return (
    <div className="card-container flex flex-col gap-4 p-5 bg-slate-100 w-[400px] min-w-[400px] min-h-[350px] max-w-[400px] max-h-[350px] rounded-3xl">
      <div className="card-header flex justify-between items-center">
        <div className="user flex justify-between items-center gap-2 ">
          <div className="pic-container w-[40px] h-[40px] flex justify-center items-center rounded-full bg-slate-700">
            <span className="text-white">
              {name?.charAt(0).toUpperCase() || 'S'}
            </span>
          </div>
          <span className="user-name">{name}</span>
        </div>
        <Button
          text={followState ? 'Following' : 'Follow'}
          className="b-orange text-white py-2 px-4 text-xs rounded-md"
          onClick={() => {
            follow(userId);
            setFollowState((prev) => !prev);
          }}
        />
      </div>

      <div className="card-body grow flex items-start justify-between ">
        <div className="img w-[150px] h-[200px]">
          <img
            src={picture || profile}
            className="w-full h-full object-cover rounded-lg"
            alt=""
          />
        </div>

        <div className="info w-[200px]  flex flex-col gap-2">
          <div>
            <div className="title text-sm font-medium">{title}</div>
            <div className="author text-xs mt-1">{author}</div>
          </div>
          <div className="description   text-xs font-light">{review}</div>
        </div>
      </div>
      <div className="card-footer flex items-center justify-between">
        <div className="genre py-2 px-3 bg-blue-300 w-fit rounded-lg">
          {genres.join('/')}
        </div>
        <img
          className="cursor-pointer"
          src={likeState ? heartFull : heartEmpty}
          alt=""
          onClick={() => {
            likeBook(_id);
            setLikeState((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
};

export default Card;

// "book": {
//   "_id": "64e21f3e364b54f1b0c5f15e",
//   "title": "Harry Potter and the Sorcerer's Stone",
//   "author": "J.K. Rowling",
//   "picture": "https://picsum.photos/200/300",
//   "genres": [
//       "Fantasy",
//       "Adventure",
//       "Young Adult"
//   ],
//   "review": "An enchanting introduction to the magical world of Hogwarts.",
//   "likes": 0,
//   "createdBy": {
//       "_id": "64e128801748f252f650248b",
//       "name": "John Doe",
//       "email": "john@gmail.com"
//   },
//   "__v": 0
// },
// "isFollowing": true,
// "isLiked": true
// }
