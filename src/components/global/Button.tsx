import React from 'react';

// components
import Spinner from './Spinner';

type propsType = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  colorScheme?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  handleClick: React.MouseEventHandler;
};

const Button = ({
  children,
  type = 'button',
  colorScheme = 'neutral',
  isLoading = false,
  isDisabled = false,
  handleClick,
}: propsType) => {
  const getColorScheme = (color: string) => {
    if (color === 'neutral')
      return 'text-darkColor bg-gray-100 dark:text-gray-200 dark:bg-gray-700';
    if (color === 'success') return 'text-lightColor bg-successColor-dark';
    if (color === 'info') return 'text-lightColor bg-infoColor-dark';
    if (color === 'failure') return 'text-lightColor bg-failureColor-dark';
    if (color === 'warn') return 'text-lightColor bg-warnColor-dark';
    return 'text-darkColor bg-gray-100';
  };

  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md text-sm font-medium hover:opacity-75 h-auto ${getColorScheme(
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