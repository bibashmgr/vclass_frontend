import { IconType } from 'react-icons';

type propsType = {
  title: string | number;
  subtitle: string | number | undefined | null;
  hasIcon?: boolean;
  Icon: IconType;
};

const Card = ({ title, subtitle, hasIcon = true, Icon }: propsType) => {
  return (
    <div className='flex px-4 py-4 bg-white border border-gray-200 rounded-md shadow-light dark:shadow-none hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 gap-2 items-center cursor-pointer'>
      {hasIcon && <Icon className='w-7 h-7 text-gray-700 dark:text-gray-400' />}
      <div className='flex flex-col gap-1'>
        <p className='text-sm font-bold tracking-tight text-gray-900 dark:text-white'>
          {title}:
        </p>
        <p className='font-normal text-gray-700 dark:text-gray-400 text-xs'>
          {subtitle || 'none'}
        </p>
      </div>
    </div>
  );
};

export default Card;
