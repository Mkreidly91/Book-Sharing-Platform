import React, { useRef, useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import mag from '../../assets/icons/magnifier.svg';
import genre from '../../assets/icons/genre.svg';
import genreWhite from '../../assets/icons/genre-white.svg';
import author from '../../assets/icons/author.svg';
import authorWhite from '../../assets/icons/author-white.svg';

// import { search, getMessagesById } from '../../helpers/common.helpers';
const falseState = {
  genre: false,
  author: false,
};
const Search = ({ setMessages, setUser, userType }) => {
  const [query, setQuery] = useState('');
  // const [results, setResults] = useState();
  const timeout = useRef();

  const [clicked, setClicked] = useState(falseState);

  const toggleState = (button) => {
    setClicked({ ...falseState, [button]: !clicked[button] });
  };
  const changeHandler = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  async function handleDebounceSearch(e) {
    clearTimeout(timeout.current);
    if (!query.trim()) {
      setResults('');
      return;
    }

    timeout.current = setTimeout(async () => {
      // const users = await search({
      //   userType: userType,
      //   search: query.trim().toLowerCase(),
      // });
      setResults(users);
    }, 600);
  }

  return (
    <div className="w-[600px]  h-fit  rounded-2xl flex flex-col  gap-5 ">
      <div className="input-container relative flex flex-col  justify-center gap-5 ">
        <CustomInput
          type="search"
          className="bg-slate-100 pl-[100px] "
          value={query}
          onChange={(e) => {
            changeHandler(e);
            // handleDebounceSearch(search);
          }}
          placeholder="Search book titles, authors, publishers..."
        />
        <img
          src={mag}
          className="absolute top-[50%] translate-x-[30px] translate-y-[-30%] "
          alt=""
        />
      </div>

      {/* <div className="results flex flex-col gap-5 max-h-[200px] overflow-auto">
        {query &&
          results &&
          results.data.users.map((user, index) => (
            <span
              key={index}
              onClick={async () => {
                const messages = await getMessagesById(user.id);
                setMessages(messages);
                setUser(user.id);
              }}
              className=" border-b-[1px] py-2 "
            >
              {user.name}
            </span>
          ))}
      </div> */}
      <div className="button-container flex justify-center gap-20 relative">
        <div
          className={`flex gap-3 p-1 px-3 rounded-md  cursor-pointer ${
            clicked.genre ? 'b-orange text-white' : 'bg-slate-100 text-black'
          }`}
          onClick={() => {
            toggleState('genre');
          }}
        >
          <img src={clicked.genre ? genreWhite : genre} alt="" />
          <span className=""> Genre</span>
        </div>
        <div
          className={`flex gap-3  p-1 px-3 rounded-md cursor-pointer ${
            clicked.author ? 'b-orange text-white' : 'bg-slate-100 text-black'
          }`}
          onClick={() => {
            toggleState('author');
          }}
        >
          <img src={clicked.author ? authorWhite : author} alt="" />
          <span className=""> Author</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
