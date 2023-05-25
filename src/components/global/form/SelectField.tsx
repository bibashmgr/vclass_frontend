import React from 'react';

// icons
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

type optionType = {
  title: string | number;
  value: string | number;
};

type propsType = {
  hasLabel?: boolean;
  label?: string;
  value: any;
  name: string;
  handleSelect: React.ChangeEventHandler;
  options: optionType[];
  placeHolder?: string;
  isRequired?: boolean;
};

const SelectField = ({
  hasLabel = false,
  label,
  value,
  name,
  handleSelect,
  options,
  placeHolder = 'Select an option',
  isRequired = false,
}: propsType) => {
  return (
    <div className='flex flex-col gap-2'>
      {hasLabel && (
        <label
          htmlFor={name}
          className='text-gray-400 dark:text-gray-400 text-sm font-semibold'
        >
          {label}:
        </label>
      )}
      <div className='relative'>
        <select
          className='bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer appearance-none invalid:text-gray-700 invalid:dark:text-gray-400'
          id={name}
          name={name}
          value={value}
          onChange={handleSelect}
          required={isRequired}
        >
          <option value='' disabled>
            {placeHolder}
          </option>
          {options.map((option: optionType, index) => {
            return (
              <option value={option.value} key={index}>
                {option.title}
              </option>
            );
          })}
        </select>
        <MdOutlineKeyboardArrowDown className='w-6 h-6 absolute top-1/2 -translate-y-1/2 right-2 text-gray-400 cursor-pointer' />
      </div>
    </div>
  );
};

export default SelectField;
