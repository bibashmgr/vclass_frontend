import { IconType } from 'react-icons';

type propsType = {
  Icon: IconType;
  colorScheme: string;
  title: string;
  subtitle: string;
};

const StatusCard = ({ Icon, colorScheme, title, subtitle }: propsType) => {
  const getIconColorScheme = (color: string) => {
    if (color === 'success') return 'text-emerald-500 bg-emerald-100';
    if (color === 'failure') return 'text-red-500 bg-red-100';
    if (color === 'warn') return 'text-yellow-500 bg-yellow-100';

    return 'text-blue-500 bg-blue-200';
  };

  const getSubtitleColorScheme = (color: string) => {
    if (color === 'success') return 'text-emerald-500';
    if (color === 'failure') return 'text-red-500';
    if (color === 'warn') return 'text-yellow-500';

    return 'text-blue-500';
  };
  return (
    <div className='flex gap-4 items-center bg-white dark:bg-gray-800 px-6 py-6 rounded-lg'>
      <div className={`p-2.5 ${getIconColorScheme(colorScheme)} rounded-full`}>
        <Icon className='w-7 h-7' />
      </div>
      <div className='flex flex-col'>
        <p className='text-gray-900 dark:text-white font-bold text-2xl'>
          {title}
        </p>
        <p
          className={`font-bold text-xs ${getSubtitleColorScheme(colorScheme)}`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default StatusCard;
