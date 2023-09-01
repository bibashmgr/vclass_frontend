import React from 'react';

// components
import Spinner from '../Spinner';

type propsType = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  colorScheme?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  handleClick?: React.MouseEventHandler;
  isSmall?: boolean;
};

const Button = ({
  children,
  type = 'button',
  colorScheme = 'neutral',
  isLoading = false,
  isDisabled = false,
  handleClick = () => {},
  isSmall = false,
}: propsType) => {
  const getColorScheme = (color: string) => {
    if (color === 'success')
      return 'text-white bg-emerald-500 hover:bg-emerald-600';
    if (color === 'info') return 'text-white bg-blue-500 hover:bg-blue-600';
    if (color === 'failure') return 'text-white bg-red-500 hover:bg-red-600';
    if (color === 'warn') return 'text-white bg-yellow-300 hover:bg-yellow-400';

    return 'text-gray-500 bg-white dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 border border-gray-200 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600';
  };

  return (
    <button
      type={type}
      className={`${
        isSmall ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-sm'
      } rounded-md  font-medium disabled:opacity-50 disabled:cursor-not-allowed ${getColorScheme(
        colorScheme
      )}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {isLoading ? (
        <div className='px-3'>
          <Spinner />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
