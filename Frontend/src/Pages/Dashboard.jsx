import React, { useState } from 'react';
import SideBar from '../Components/Dashboard/SideBar';
import DashBoardButton from '../Components/Dashboard/DashBoardButton';
import dashImg from '../assets/icons/DashBoard/ic_round-dashboard.svg';
import heartGrey from '../assets/icons/DashBoard/heart-grey.svg';
import people from '../assets/icons/DashBoard/people.svg';
import post from '../assets/icons/DashBoard/post.svg';
import logout from '../assets/icons/DashBoard/logout.svg';

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

  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  return (
    <div className="dashboard-wrapper p-5">
      <SideBar>
        <DashBoardButton icon={dashImg} />
        <div className="flex flex-col gap-5">
          <DashBoardButton icon={heartGrey} />
          <DashBoardButton icon={people} />
          <DashBoardButton icon={post} />
        </div>
        <DashBoardButton icon={logout} />
      </SideBar>
    </div>
  );
};
