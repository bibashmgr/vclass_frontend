import React from 'react';

type propsType = {
  hasLabel?: boolean;
  label?: string;
  type?: string;
  name: string;
  value: any;
  placeHolder?: string | undefined;
  handleChange?: React.ChangeEventHandler;
  extraStyling?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
};

const InputField = ({
  hasLabel = false,
  label,
  type = 'text',
  name,
  value,
  placeHolder = 'Enter value',
  handleChange = () => {},
  extraStyling = '',
  isDisabled = false,
  isRequired = true,
}: propsType) => {
  return (
    <div className={`flex flex-col gap-2 ${extraStyling}`}>
      {hasLabel && (
        <label
          htmlFor={name}
          className='text-gray-400 dark:text-gray-400 text-sm font-semibold'
        >
          {label}:
        </label>
      )}
      {type === 'text' && (
        <input
          id={name}
          name={name}
          value={value}
          type={type}
          placeholder={placeHolder}
          onChange={handleChange}
          required={isRequired}
          disabled={isDisabled}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-75 disabled:cursor-not-allowed'
        />
      )}
      {type === 'number' && (
        <input
          id={name}
          name={name}
          value={value}
          type={type}
          placeholder={placeHolder}
          onChange={handleChange}
          min='1'
          required={isRequired}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      )}
      {type === 'textarea' && (
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeHolder}
          onChange={handleChange}
          required={isRequired}
          rows={4}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none'
        />
      )}
    </div>
  );
};

export default InputField;
