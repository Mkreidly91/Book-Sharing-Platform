import React, { useEffect, useLayoutEffect, useState } from 'react';
import Button from '../Common/Button';
import profile from '../../assets/images/profile.png';
import heartEmpty from '../../assets/icons/heart-empty.svg';
import heartFull from '../../assets/icons/heart-full.svg';
import { follow, likeBook } from '../../helpers/user.helpers';
import { replaceObjectById } from '../../helpers/helpers';
import { getUser } from '../../helpers/auth.helpers';

const Card = ({ post, setCardState, page, className }) => {
  const { book, isFollowing, isLiked } = post;
  const { _id, title, author, picture, genres, review, createdBy } = book;
  const { _id: userId, name } = createdBy;
  const { _id: myId } = getUser();
  const myPost = myId === userId;
  const [followState, setFollowState] = useState(false);
  const [likeState, setLikeState] = useState(false);

  useEffect(() => {
    setFollowState(isFollowing);
    setLikeState(isLiked);
  }, [isFollowing, isLiked]);

  return (
    <div
      className={`card-container flex flex-col gap-4 p-5 bg-slate-100 w-[400px] min-w-[400px] min-h-[350px] max-w-[400px] max-h-[350px] rounded-3xl ${className}`}
    >
      <div className="card-header flex justify-between items-center">
        <div className="user flex justify-between items-center gap-2 ">
          <div className="pic-container w-[40px] h-[40px] flex justify-center items-center rounded-full bg-slate-700">
            <span className="text-white">
              {name?.charAt(0).toUpperCase() || 'S'}
            </span>
          </div>
          <span className="user-name">{name}</span>
        </div>
        {!myPost && (
          <Button
            text={followState ? 'Following' : 'Follow'}
            className="b-orange text-white py-2 px-4 text-xs rounded-md"
            onClick={() => {
              follow(userId);
              setFollowState((prev) => !prev);

              setCardState((prev) => {
                const newState = prev.map((e) => {
                  if (e.book.createdBy._id === userId) {
                    return { ...e, isFollowing: !e.isFollowing };
                  }
                  return e;
                });
                return newState;
              });

              if (page.followed) {
                setCardState((prev) => {
                  const newState = prev.filter(
                    (e) => e.book.createdBy._id !== userId
                  );
                  return newState;
                });
              }
            }}
          />
        )}
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
        <div className="genre py-2 px-3 bg-blue-300 w-fit rounded-lg text-[11px]">
          {genres.join('/')}
        </div>
        {!myPost && (
          <img
            className="cursor-pointer"
            src={likeState ? heartFull : heartEmpty}
            alt=""
            onClick={() => {
              likeBook(_id);
              setLikeState((prev) => !prev);
              if (page.liked) {
                setCardState((prev) => {
                  const newState = prev.filter((e) => e.book._id !== _id);
                  return newState;
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
