import { useNavigate } from 'react-router-dom';

type propsType = {
  tabs: any[];
  activeIndex?: number;
};

const Tabs = ({ tabs, activeIndex = 0 }: propsType) => {
  const navigate = useNavigate();

  return (
    <div className='w-full'>
      <div className='grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-white rounded-lg dark:bg-gray-600'>
        {tabs.map((tab, index) => {
          return (
            <button
              key={index}
              type='button'
              className={`px-5 py-1.5 text-xs font-medium rounded-lg
                ${
                  index === activeIndex
                    ? 'text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900'
                    : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                }
                  `}
              onClick={() => navigate(`${tab.url}`)}
            >
              {tab.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
