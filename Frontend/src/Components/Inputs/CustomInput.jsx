import React from 'react';

const CustomInput = ({
  name,
  label,
  value,
  onChange,
  type = 'text',
  className,
  error,
  placeholder,
}) => {
  return (
    <div className="input-container flex flex-col gap-2 font-normal">
      <label className="monster block uppercase tracking-wide text-gray-700 text-xs font-bold">
        {label}
      </label>
      <input
        name={name}
        value={value}
        className={` shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error && 'border-red-500'
        } ${className}`}
        type={type}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
