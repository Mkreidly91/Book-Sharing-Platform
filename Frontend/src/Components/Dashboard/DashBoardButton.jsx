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
      className={`icon-container cursor-pointer hover:border  hover:border-solid hover:border-blue-700  ${className} ${
        selected && 'border border-solid border-blue-700'
      }`}
      onClick={onClick}
    >
      <img className={`${iconStyles}`} src={icon} alt="" />
    </div>
  );
};

export default DashBoardButton;
