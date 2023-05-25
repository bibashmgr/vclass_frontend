import React from 'react';
import { IconType } from 'react-icons';

type propsType = {
  title: string;
  hasIcon: boolean;
  Icon: IconType;
  bgColor?: string;
  color?: string;
};

const Badge = ({
  title,
  hasIcon,
  Icon,
  bgColor = 'bg-blue-100 dark:bg-gray-700',
  color = 'text-blue-800 dark:text-blue-400',
}: propsType) => {
  return (
    <div
      className={`${color} ${bgColor} text-xs font-medium inline-flex gap-1 items-center px-2.5 py-0.5 rounded-md`}
    >
      {hasIcon && <Icon className='w-3 h-3' />}
      {title}
    </div>
  );
};

export default Badge;
