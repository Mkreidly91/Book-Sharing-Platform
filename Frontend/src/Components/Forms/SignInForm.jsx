import React, { useState } from 'react';
import Modal from '../Common/Modal';
import CustomInput from '../Inputs/CustomInput';
import { logIn } from '../../helpers/auth.helpers';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

const SignInForm = ({ setShow, className }) => {
  const [inputState, setInputState] = useState(initialState);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  function onChange(e) {
    const { value, name } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSignIn() {
    const { data, error } = await logIn(inputState);
    console.log(error);
    if (error) {
      setErrors(error);
      return;
    }
    if (data) {
      setErrors('');
      localStorage.setItem('userInfo', JSON.stringify(data));
      // if(data.user_type=="1"){
      //   navigate('/adminDash');
      // } else if(data.user_type=="2"){
      //   navigate('/teacherDash');
      // } else if(data.user_type=="3"){
      //   navigate('/parentDash');
      // } else {
      //   navigate('/studentDash');
      // }
    }
  }

  const { email, password } = inputState;
  return (
    <Modal
      // setShow={setShow}
      className={` bg-white dark:text-slate-200 signIn-container text-white  text-lg   flex flex-col items-center gap-5 insta-border rounded-2xl ${className} `}
    >
      <div className="form-header gothic flex p-6 w-full rounded-t-2xl bg-cyan-dark ">
        Sign In
      </div>
      <div className="form-container flex flex-col gap-5 p-6 pb-0 ">
        <CustomInput
          label="Email"
          name="email"
          type="text"
          onChange={onChange}
          value={email}
          className={'w-[300px]'}
          labelStyle={{ color: 'white' }}
        />
        <CustomInput
          label="password"
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          className={'w-[300px]  '}
        />
      </div>
      <div className="error font-normal text-red-700 text-sm">{errors}</div>
      <div className=" monster flex  gap-3 w-full px-5 pb-5">
        <div
          onClick={() => handleSignIn()}
          className="sign-in bg-insta-blue p-2 rounded text-center text-white  bg-cyan-dark  w-full cursor-pointer"
        >
          Sign In
        </div>
        <div
          onClick={() => setShow(false)}
          className=" sign-in color-cyan-medium p-2 rounded text-center w-full cursor-pointer"
        >
          Cancel
        </div>
      </div>
      <Link to="/signUp" className="flex justify-end cursor-pointer">
        <div className="small-text text-xs text-white justify-self-end">
          New here? sign up now!
        </div>
      </Link>
    </Modal>
  );
};

export default SignInForm;
