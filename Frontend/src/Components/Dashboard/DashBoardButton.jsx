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
      className={`icon-container cursor-pointer hover:outline  hover:outline-solid hover:outline-blue-700  ${className} ${
        selected && 'outline outline-solid outline-blue-700'
      }`}
      onClick={onClick}
    >
      <img className={`${iconStyles}`} src={icon} alt="" />
    </div>
  );
};

export default DashBoardButton;
