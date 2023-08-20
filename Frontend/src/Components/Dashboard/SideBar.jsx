import React from 'react';

const SideBar = ({ children, className, width = 50 }) => {
  return (
    <>
      {/* <div className={`class min-w-[${width}px] h-full`}></div> */}
      <div
        className={` min-w-[${width}px] h-full
 ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default SideBar;
