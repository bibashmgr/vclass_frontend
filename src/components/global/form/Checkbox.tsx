import React from 'react';

type propsType = {
  handleChange: React.ChangeEventHandler;
  hasLabel?: boolean;
  name: string;
  value: string;
};

const Checkbox = ({
  handleChange,
  hasLabel = false,
  name = '',
  value = '',
}: propsType) => {
  return (
    <div className='flex items-center'>
      <input
        type='checkbox'
        name={name}
        value={value}
        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer'
        onChange={handleChange}
      />
      {hasLabel && (
        <label
          htmlFor={name}
          className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          {value}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
