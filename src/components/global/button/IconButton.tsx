import React from 'react';
import { IconType } from 'react-icons';

type propsType = {
  Icon: IconType;
  iconSize?: number | string;
  title?: string;
  hasIncidator?: boolean;
  indicatorTitle?: string;
  handleClick?: React.MouseEventHandler;
};

const IconButton = ({
  Icon,
  iconSize = '5',
  title = '',
  handleClick,
  hasIncidator = false,
  indicatorTitle = '0',
}: propsType) => {
  return (
    <button
      type='button'
      title={title}
      onClick={handleClick}
      className='border border-gray-300 dark:border-gray-500 inline-flex rounded-md p-[6px] cursor-pointer relative hover:opacity-80'
    >
      {
        <Icon
          className={`w-${iconSize} h-${iconSize} text-darkColor dark:text-gray-200`}
        />
      }
      {hasIncidator && (
        <div className='absolute inline-flex items-center justify-center w-[18px] h-[18px] text-[10px] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-[6px] dark:border-none'>
          <div className='flex items-center justify-center'>
            {indicatorTitle}
          </div>
        </div>
      )}
    </button>
  );
};

export default IconButton;
