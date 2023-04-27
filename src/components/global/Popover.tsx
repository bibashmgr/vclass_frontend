import React, { useState } from 'react';

type propsType = {
  parentElement: React.ReactNode;
  children: React.ReactNode;
};

const Popover = ({ parentElement, children }: propsType) => {
  const [isPopover, setIsPopover] = useState(false);

  const handlePopover = () => {
    setIsPopover(!isPopover);
  };

  return (
    <div className='relative'>
      <div onClick={handlePopover}>{parentElement}</div>
      <div
        className={`absolute z-10 right-0 -bottom-[52px] inline-block w-44 divide-y divide-gray-100 dark:divide-gray-600 text-sm text-gray-500 dark:text-gray-400 transition-opacity duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-light dark:shadow-none ${
          isPopover ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
        <div className='w-3.5 h-3.5 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-600 absolute -top-2 right-2.5 rotate-45'></div>
      </div>
    </div>
  );
};

export default Popover;
