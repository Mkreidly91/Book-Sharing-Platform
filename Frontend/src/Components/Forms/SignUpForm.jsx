import React, { useState } from 'react';

import { register } from '../../helpers/auth.helpers';
import CustomInput from '../Inputs/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Common/Button';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const SignUpForm = () => {
  const [inputState, setInputState] = useState(initialState);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  console.log(errors);

  function onChange(e) {
    const { value, name } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  async function handlesignUp() {
    const { data, error } = await register(inputState);
    if (error) {
      setErrors(error);
      return;
    }
    navigate('/');
  }

  const { name, username, email, password } = inputState;
  return (
    <div className="page-wrapper h-full flex flex-col justify-center items-center">
      <div className="signUp-container flex flex-col items-center gap-5 insta-border  h-fit p-10">
        <div className="logo-container flex place-content-center">
          {/* <img className="w-[175px]" src={instaLogo} alt="" /> */}
        </div>
        <div className="form-container flex flex-col gap-5">
          <CustomInput
            label="Full Name"
            name="name"
            type="text"
            onChange={onChange}
            value={name}
            className={'w-[300px]'}
          />

          <CustomInput
            label="Email"
            name="email"
            type="email"
            onChange={onChange}
            value={email}
            className={'w-[300px]'}
          />
          <CustomInput
            label="password"
            name="password"
            type="password"
            onChange={onChange}
            value={password}
            className={'w-[300px]'}
          />
        </div>
        <Button
          text="SignUp"
          onClick={() => handlesignUp()}
          className="sign-in bg-insta-blue mt-5 p-2 rounded text-center w-full"
        />

        <div className="error font-normal text-red-700 text-sm">{errors}</div>
      </div>
      <div className="sign-up mt-10 insta-border p-10 w-[382px] text-center">
        Already have an account?
        <Link to="/">
          <span className="color-insta-blue cursor-pointer">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
