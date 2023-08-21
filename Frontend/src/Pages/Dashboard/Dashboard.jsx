import React, { useEffect, useState } from 'react';
import SideBar from '../../Components/Dashboard/SideBar';
import DashBoardButton from '../../Components/Dashboard/DashBoardButton';
import Logo from '../../Components/Common/logo';

import dashImg from '../../assets/icons/DashBoard/ic_round-dashboard.svg';
import heartGrey from '../../assets/icons/DashBoard/heart-grey.svg';
import people from '../../assets/icons/DashBoard/people.svg';
import postImg from '../../assets/icons/DashBoard/post.svg';
import logout from '../../assets/icons/DashBoard/logout.svg';

import './Dashboard.css';
import Card from '../../Components/Posts/Card';
import Search from '../../Components/Common/Search';
import {
  getAllFollowed,
  search,
  getAllLiked,
  follow,
} from '../../helpers/user.helpers';
import AddPost from '../../Components/Forms/AddPost';

const falseState = {
  search: false,
  followed: false,
  liked: false,
  all: false,
  post: false,
};

const Dashboard = () => {
  const [state, setState] = useState({
    followed: false,
    liked: false,
    all: true,
    post: false,
  });

  const [cards, setCards] = useState();
  const [show, setShow] = useState(false);

  const { followed, liked, all, post } = state;
  useEffect(() => {
    const getAll = async () => {
      const res = await search({});
      setCards(res);
    };
    getAll();
  }, []);

  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  return (
    <div className="dashboard-wrapper h-full p-5">
      <div className=" flex justify-center items-center relative h-fit z-0">
        <Logo className="absolute left-0 top-5 transform " />
        <Search togglePage={togglePage} setCards={setCards} />
      </div>

      <div className="flex ">
        <SideBar className="fixed flex items-center  flex-col  gap-32 min-w-[50px]  w-fit">
          <DashBoardButton
            onClick={async () => {
              togglePage('all');
              const res = await search({});
              setCards(res);
            }}
            iconStyles={'w-[28px] '}
            icon={dashImg}
            selected={all}
          />
          <div className="flex flex-col gap-10">
            <DashBoardButton
              onClick={async () => {
                togglePage('liked');
                const res = await getAllLiked();
                setCards(res);
              }}
              iconStyles={'w-[28px] '}
              icon={heartGrey}
              selected={liked}
            />
            <DashBoardButton
              onClick={async () => {
                togglePage('followed');
                const res = await getAllFollowed();
                setCards(res);
              }}
              iconStyles={'w-[28px] '}
              icon={people}
              selected={followed}
            />
            <DashBoardButton
              onClick={() => {
                togglePage('post');
                setShow(true);
              }}
              iconStyles={'w-[28px] '}
              icon={postImg}
            />
          </div>
          <DashBoardButton
            onClick={() => {
              togglePage('');
            }}
            iconStyles={'w-[28px] '}
            icon={logout}
          />
        </SideBar>

        <div className="cards flex flex-wrap gap-5 justify-center  gap-y-[50px] mx-auto ">
          {cards &&
            state.followed &&
            cards.map((post) => (
              <Card
                key={post.book._id}
                post={post}
                setCardState={setCards}
                page={state}
              />
            ))}

          {cards &&
            state.all &&
            cards.map((post) => (
              <Card
                key={post.book._id}
                post={post}
                setCardState={setCards}
                page={state}
              />
            ))}

          {cards &&
            state.liked &&
            cards.map((post) => (
              <Card
                key={post.book._id}
                post={post}
                setCardState={setCards}
                page={state}
              />
            ))}

          {cards &&
            state.search &&
            cards.map((post) => (
              <Card
                key={post.book._id}
                post={post}
                setCardState={setCards}
                page={state}
              />
            ))}

          {post && show && (
            <AddPost
              setShow={setShow}
              togglePage={togglePage}
              setCardState={setCards}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
