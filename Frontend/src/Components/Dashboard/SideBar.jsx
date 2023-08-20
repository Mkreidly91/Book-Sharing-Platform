import React from 'react';

const SideBar = ({ children, className, width }) => {
  return (
    <>
      <div className={`class min-w-[${width}px] h-full`}></div>
      <div
        className={`fixed mmin-w-[${width}px] h-full
 ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default SideBar;
