type propsType = {
  title: string;
  colorScheme?: string;
  isSmall?: boolean;
};

const Badge = ({ title, colorScheme = 'info', isSmall = false }: propsType) => {
  const getColorScheme = (color: string) => {
    if (color === 'success' || color === 'done' || color === 'present')
      return 'text-emerald-600 bg-emerald-200';
    if (color === 'failure' || color === 'missing' || color === 'absent')
      return 'text-red-600 bg-red-200';
    if (color === 'warn' || color === 'late')
      return 'text-yellow-600 bg-yellow-200';

    return 'text-blue-600 bg-blue-200';
  };
  return (
    <div
      className={`${getColorScheme(colorScheme)} ${
        isSmall ? 'text-[10px] px-1.5 py-1.5' : 'text-xs px-2 py-2'
      } font-bold inline-flex gap-1 items-center  rounded-lg capitalize`}
    >
      {title}
    </div>
  );
};

export default Badge;
