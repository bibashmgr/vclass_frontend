import React from 'react';

// icons
import { IoMdInformation } from 'react-icons/io';
import { BiCheck } from 'react-icons/bi';
import { TiWarning } from 'react-icons/ti';
import { MdClose } from 'react-icons/md';

type propsType = {
  type: string;
  title: string;
};

const Toast = ({ type, title }: propsType) => {
  const getIcon = () => {
    if (type === 'failure')
      return (
        <div className='inline-flex items-center justify-center flex-shrink-0 p-1 text-lightColor bg-failureColor-dark'>
          <TiWarning className='w-6 h-6' />
        </div>
      );
    if (type === 'success')
      return (
        <div className='inline-flex items-center justify-center flex-shrink-0 p-1 text-lightColor bg-successColor-dark'>
          <BiCheck className='w-6 h-6' />
        </div>
      );
    return (
      <div className='inline-flex items-center justify-center flex-shrink-0 p-1 text-lightColor bg-infoColor-dark rounded-lg'>
        <IoMdInformation className='w-6 h-6' />
      </div>
    );
  };

  return (
    <div className='flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-md shadow-light dark:shadow dark:text-gray-400 dark:bg-gray-800'>
      {getIcon()}
      <div className='ml-3 text-sm font-normal'>{title}</div>
      <button
        type='button'
        className='ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
        aria-label='Close'
      >
        <MdClose className='w-5 h-5' />
      </button>
    </div>
  );
};

export default Toast;
