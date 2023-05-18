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
      return 'text-lightColor bg-successColor-dark hover:opacity-75';
    if (color === 'info')
      return 'text-lightColor bg-infoColor-dark hover:opacity-75';
    if (color === 'failure')
      return 'text-lightColor bg-failureColor-dark hover:opacity-75';
    if (color === 'warn')
      return 'text-lightColor bg-warnColor-dark hover:opacity-75';

    return 'text-gray-500 bg-white dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 border border-gray-200 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600';
  };

  return (
    <button
      type={type}
      className={`${
        isSmall ? 'px-3 py-2 text-xs' : 'px-5 py-2.5 text-sm'
      } rounded-md  font-medium disabled:opacity-75 disabled:cursor-not-allowed ${getColorScheme(
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
