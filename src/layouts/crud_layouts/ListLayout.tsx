import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// components
import Button from '../../components/global/button/Button';
import { getColorMode } from '../../handlers/storageHandler';

type propsType = {
  children: React.ReactNode;
  tableHeader: string[];
  layoutTitle: string;
  layoutSubtitle: string;
  hasCreateBtn?: boolean;
  isEmpty: boolean;
  isLoading: boolean;
};

const ListLayout = ({
  children,
  tableHeader,
  layoutTitle,
  layoutSubtitle,
  isEmpty,
  isLoading,
  hasCreateBtn = true,
}: propsType) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddSubject = () => {
    navigate(`${location.pathname}/create`);
  };

  return (
    <div className='shadow-light dark:shadow-none rounded-lg bg-lightColor dark:bg-gray-800 px-6 py-6 flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-darkColor dark:text-lightColor text-lg font-semibold'>
            {layoutTitle}
          </p>
          <p className='text-gray-400 dark:text-gray-400 text-xs font-normal'>
            {layoutSubtitle}
          </p>
        </div>
        {hasCreateBtn && <Button handleClick={handleAddSubject}>Create</Button>}
      </div>
      <div className='relative block overflow-x-auto whitespace-nowrap'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3 rounded-l-lg'>
                S.N.
              </th>
              {tableHeader.map((header, headerIndex) => {
                return (
                  <th key={headerIndex + 1} scope='col' className='px-6 py-3'>
                    {header}
                  </th>
                );
              })}
              <th scope='col' className='px-6 py-3 rounded-r-lg'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className='bg-white dark:bg-gray-800'>
                <td colSpan={tableHeader.length + 2} className='py-4'>
                  <div className='animate-pulse flex flex-col gap-4 w-full'>
                    <div className='h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-full'></div>
                    <div className='h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-full'></div>
                    <div className='h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-full'></div>
                  </div>
                </td>
              </tr>
            ) : isEmpty ? (
              <tr className='bg-white dark:bg-gray-800'>
                <td colSpan={tableHeader.length + 2} className='py-4'>
                  <div className='w-full py-6 flex flex-col gap-4 justify-center items-center'>
                    <img
                      src={
                        getColorMode() === 'dark'
                          ? '/images/empty-content-dark.svg'
                          : '/images/empty-content-light.svg'
                      }
                      alt='No data'
                      className='w-[150px] h-[150px]'
                    />
                    <p className='text-gray-400 font-medium text-sm'>
                      Couldn't find any data
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListLayout;
