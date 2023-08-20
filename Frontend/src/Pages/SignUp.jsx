import React, { useState } from 'react';
import SignInForm from '../Components/Forms/SignInForm';
import signUpImage from '../assets/images/book-sign-up.png';
import Logo from '../Components/Common/logo';
import { Link } from 'react-router-dom';
import SignUpForm from '../Components/Forms/SignUpForm';

const SignUp = () => {
  return (
    <div className="flex h-[100vh] bg-slate-50">
      <img src={signUpImage} className="h-full  object-contain" alt="" />
      <div className="grow from-container flex flex-col items-center justify-between ">
        <div className="header  w-full flex items-center justify-between py-10 px-10">
          <Logo />

          <div className="flex justify-end text-xs text-black ">
            have an account?
            <Link to="/" className=" cursor-pointer">
              <span className="color-orange font-medium ml-1">Sign in!</span>{' '}
            </Link>
          </div>
        </div>

        <SignUpForm className="grow mt-5" />
      </div>
    </div>
  );
};

export default SignUp;
