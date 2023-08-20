import React, { useState } from 'react';
import SignInForm from '../Components/Forms/SignInForm';
import signInImage from '../assets/images/books-signin.png';
import Logo from '../Components/Common/logo';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="flex h-[100vh]">
      <div className="grow from-container flex flex-col items-center justify-between ">
        <div className="header  w-full flex items-center justify-between py-10 px-10">
          <Logo />

          <div className="flex justify-end text-xs text-black ">
            Don't have an account?
            <Link to="/signUp" className=" cursor-pointer">
              <span className="color-orange font-medium ml-1">Sign up!</span>{' '}
            </Link>
          </div>
        </div>

        <SignInForm className="grow mt-10" />
      </div>
      <img src={signInImage} className="h-full  object-contain" alt="" />
    </div>
  );
};

export default SignIn;
