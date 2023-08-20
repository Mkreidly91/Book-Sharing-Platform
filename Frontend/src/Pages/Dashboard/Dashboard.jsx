import React, { useEffect, useState } from 'react';
import SideBar from '../../Components/Dashboard/SideBar';
import DashBoardButton from '../../Components/Dashboard/DashBoardButton';
import Logo from '../../Components/Common/logo';

import dashImg from '../../assets/icons/DashBoard/ic_round-dashboard.svg';
import heartGrey from '../../assets/icons/DashBoard/heart-grey.svg';
import people from '../../assets/icons/DashBoard/people.svg';
import post from '../../assets/icons/DashBoard/post.svg';
import logout from '../../assets/icons/DashBoard/logout.svg';

import './Dashboard.css';
import Card from '../../Components/Posts/Card';
import Search from '../../Components/Common/Search';
import { getAllFollowed } from '../../helpers/user.hepers';

const falseState = {
  feed: false,
  liked: false,
  all: false,
  post: false,
};

const Dashboard = () => {
  const [state, setState] = useState({
    feed: false,
    liked: false,
    all: false,
    post: false,
  });

  useEffect(() => {
    const getFollowing = async () => {
      const res = await getAllFollowed();

      console.log(res);
    };
    getFollowing();
  }, []);
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  return (
    <div className="dashboard-wrapper h-full p-5">
      <div className=" flex justify-center items-center relative h-fit z-0">
        <Logo className="absolute left-0" />
        <Search />
      </div>
      <div className="flex gap-20">
        <SideBar className=" flex flex-col gap-10 min-w-[50px] justify-between w-fit">
          <DashBoardButton
            onClick={() => {
              togglePage('');
            }}
            iconStyles={'w-[30px]'}
            icon={dashImg}
          />
          <div className="flex flex-col gap-20">
            <DashBoardButton
              onClick={() => {
                togglePage('');
              }}
              iconStyles={'w-[30px]'}
              icon={heartGrey}
            />
            <DashBoardButton
              onClick={() => {
                togglePage('');
              }}
              iconStyles={'w-[30px]'}
              icon={people}
            />
            <DashBoardButton
              onClick={() => {
                togglePage('');
              }}
              iconStyles={'w-[30px]'}
              icon={post}
            />
          </div>
          <DashBoardButton
            onClick={() => {
              togglePage('');
            }}
            iconStyles={'w-[30px]'}
            icon={logout}
          />
        </SideBar>
        <div className="cards grow flex  gap-6 flex-wrap justify-center ">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
