import React from 'react';
import Button from '../Common/Button';
import profile from '../../assets/images/profile.png';
import heartEmpty from '../../assets/icons/heart-empty.svg';
import heartFull from '../../assets/icons/heart-full.svg';
const Card = ({ title, author, picture, genres, review, isFollowing }) => {
  // const { title, author, picture, genres, review } = req.body;
  return (
    <div className="card-container flex flex-col gap-3 p-5 bg-slate-100 w-[400px] min-w-[400px] min-h-[300px] rounded-3xl">
      <div className="card-header flex justify-between items-center">
        <div className="user flex justify-between items-center gap-2 ">
          <div className="pic-container w-[40px] h-[40px] flex justify-center items-center rounded-full bg-slate-700">
            <span className="text-white">N</span>
          </div>
          <span className="user-name">Nina</span>
        </div>
        <Button
          text="Following"
          className="b-orange text-white py-2 px-4 text-xs rounded-md"
        />
      </div>

      <div className="card-body grow flex items-center justify-betweens ">
        <div className="img w-fit h-full self-center flex items-start">
          <img src={profile} className="" alt="" />
        </div>

        <div className="info w-[200px]  flex flex-col gap-2">
          <div>
            <div className="title text-sm font-medium">Catcher in the Rye</div>
            <div className="author text-xs mt-1">J.D. Salinger</div>
          </div>
          <div className="description   text-xs font-light">
            I LOVE IT when I go into a book with low expectations and it ends up
            knocking me on my ass. Admittedly, this is tougher to do with
            "classics" but it certainly happened in this case. I remember first
            reading this in school (like many of us) and not thinking it was
            anything special.
          </div>
        </div>
      </div>
      <div className="card-footer flex items-center justify-between">
        <div className="genre py-2 px-3 bg-blue-300 w-fit rounded-lg">
          Fiction
        </div>
        <img src={heartFull} alt="" />
      </div>
    </div>
  );
};

export default Card;
