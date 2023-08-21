import React, { useState } from 'react';

const DashBoardButton = ({
  selected,
  onClick,
  icon = '',
  className,
  iconStyles,
}) => {
  return (
    <div
      className={`icon-container cursor-pointer  border-b-2 pb-2 border-transparent  hover:border-orange-500 ${className} ${
        selected && 'border-orange-400'
      }`}
      onClick={onClick}
    >
      <img className={`${iconStyles} w-fit object-contain`} src={icon} alt="" />
    </div>
  );
};

export default DashBoardButton;
