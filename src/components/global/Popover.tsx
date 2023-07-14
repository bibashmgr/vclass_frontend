import React, { useRef, useState, useEffect } from 'react';

type propsType = {
  parentElement: React.ReactNode;
  children: React.ReactNode;
  popDirection?: 'left' | 'right';
  isDisabled?: boolean;
};

const Popover = ({
  parentElement,
  children,
  popDirection = 'right',
  isDisabled = false,
}: propsType) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isPopover, setIsPopover] = useState(false);

  const handlePopover = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopover(!isPopover);
  };

  const handleClose = (e: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(e.target as HTMLElement)
    ) {
      setIsPopover(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClose);

    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  }, []);

  return (
    <div
      className={`relative ${
        isDisabled ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      ref={popoverRef}
    >
      <div onClick={handlePopover}>{parentElement}</div>
      <div
        className={`absolute z-10 ${
          popDirection === 'right' ? 'right-0' : 'left-0'
        } top-12 inline-block min-w-[120px] divide-y divide-gray-100 dark:divide-gray-600 text-sm text-gray-500 dark:text-gray-400 transition-opacity duration-300 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-md shadow-light dark:shadow-none ${
          isPopover
            ? 'opacity-100 cursor-pointer pointer-events-auto'
            : 'opacity-0 cursor-none pointer-events-none'
        }`}
      >
        {children}
        <div
          className={`w-3.5 h-3.5 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-600 absolute -top-2 ${
            popDirection === 'right' ? 'right-2.5' : 'left-2.5'
          } rotate-45`}
        ></div>
      </div>
    </div>
  );
};

export default Popover;
