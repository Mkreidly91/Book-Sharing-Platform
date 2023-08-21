import React, { useState, useRef } from 'react';
import Modal from '../Common/Modal';
import TextArea from '../Inputs/TextArea';
import CustomInput from '../Inputs/CustomInput';
import { toBase64 } from '../../helpers/helpers';
import Button from '../Common/Button';
import { addPost } from '../../helpers/user.helpers';

const initialState = {
  title: '',
  author: '',
  picture: '',
  genres: '',
  review: '',
};
const AddPost = ({ setShow, togglePage, setCardState }) => {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState();
  const fileInput = useRef();
  function onChange(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  async function onImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setState((prev) => ({ ...prev, picture: base64 }));
  }

  const { title, author, picture, genres, review } = state;
  console.log(state);
  async function handleSave() {
    const { error, post } = await addPost(state);
    if (error) {
      setErrors(error);
      return;
    }
    console.log(post);
    setCardState((prev) => [post, ...prev]);
    setState(initialState);
  }

  return (
    <Modal
      togglePage={togglePage}
      setShow={setShow}
      backDropColor={'bg-black'}
      className="flex flex-col justify-center items-center gap-5 bg-white p-10 rounded-3xl"
    >
      <CustomInput
        label="title"
        name="title"
        type="text"
        onChange={onChange}
        value={title}
        className={'w-[300px] text-black bg-slate-100'}
        placeholder="Title"
      />

      <CustomInput
        label="Author"
        name="author"
        type="text"
        onChange={onChange}
        value={author}
        className={'w-[300px] text-black bg-slate-100'}
        placeholder="Author"
      />

      <CustomInput
        label="Genres"
        name="genres"
        type="text"
        onChange={onChange}
        value={genres}
        className={'w-[300px] text-black bg-slate-100'}
        placeholder="Adventure,Dystopian,etc..."
      />

      <TextArea
        label="Review"
        name="review"
        onChange={onChange}
        value={review}
        className={'w-[300px] text-black bg-slate-100'}
        placeholder="Review"
        rows={30}
      />

      <input
        ref={fileInput}
        className=" mt-5 cursor-pointer file-input file-input-bordered file-input-primary w-full h-fit max-w-xs  bg-transparent  appearance-none border   text-gray-400   focus:outline-none placeholder:text-xs placeholder:font-normal placeholder:text-gray-300  rounded-md  bg-slate-100"
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />

      <div className="error font-light text-red-700 text-xs min-h-[14px] mt-2">
        {errors}
      </div>

      <div className="flex gap-5">
        <Button
          onClick={() => {
            handleSave();
          }}
          className={'cursor-pointer'}
          text="Save"
        />
        <Button
          onClick={() => {
            setShow(false);
            togglePage('all');
          }}
          className={'cursor-pointer'}
          text="Cancel"
        />
      </div>
    </Modal>
  );
};

export default AddPost;
