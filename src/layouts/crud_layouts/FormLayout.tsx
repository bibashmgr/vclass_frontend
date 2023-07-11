import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Button from '../../components/global/button/Button';
import IconButton from '../../components/global/button/IconButton';

// icons
import { IoChevronBack } from 'react-icons/io5';

type propsType = {
  children: React.ReactNode;
  layoutTitle: string;
  layoutSubtitle: string;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  isEdit?: boolean;
  isLoading?: boolean;
};

const FormLayout = ({
  children,
  layoutTitle,
  layoutSubtitle,
  handleSubmit,
  isEdit = false,
  isLoading = false,
}: propsType) => {
  const navigate = useNavigate();

  return (
    <form
      className='shadow-light dark:shadow-none rounded-lg bg-white dark:bg-gray-800 px-6 py-6 flex flex-col gap-6'
      onSubmit={handleSubmit}
    >
      <div className='flex items-center gap-4'>
        <IconButton
          title='Go Back'
          handleClick={() => navigate(-1)}
          Icon={IoChevronBack}
        />
        <div>
          <p className='text-gray-900 dark:text-white text-lg font-semibold'>
            {layoutTitle}
          </p>
          <p className='text-gray-400 dark:text-gray-400 text-xs font-normal'>
            {layoutSubtitle}
          </p>
        </div>
      </div>
      {isLoading ? (
        <div className='animate-pulse grid gap-4 lg:grid-cols-2 w-full'>
          <div className='h-14 bg-gray-200 rounded-lg dark:bg-gray-700 w-full'></div>
          <div className='h-14 bg-gray-200 rounded-lg dark:bg-gray-700 w-full'></div>
          <div className='h-14 bg-gray-200 rounded-lg dark:bg-gray-700 w-full'></div>
          <div className='h-14 bg-gray-200 rounded-lg dark:bg-gray-700 w-full'></div>
        </div>
      ) : (
        <div className='grid gap-4 lg:grid-cols-2'>{children}</div>
      )}
      <div className='flex justify-end'>
        <Button type='submit' colorScheme='success' isDisabled={isLoading}>
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default FormLayout;
