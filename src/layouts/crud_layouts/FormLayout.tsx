import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Button from '../../components/global/Button';
import IconButton from '../../components/global/IconButton';

// icons
import { IoChevronBack } from 'react-icons/io5';

type propsType = {
  children: React.ReactNode;
  layoutTitle: string;
  layoutSubtitle: string;
  handleSubmit: (e: React.MouseEvent) => void;
  isEdit: boolean;
};

const FormLayout = ({
  children,
  layoutTitle,
  layoutSubtitle,
  handleSubmit,
  isEdit,
}: propsType) => {
  const navigate = useNavigate();

  return (
    <form className='shadow-light dark:shadow-none rounded-lg bg-lightColor dark:bg-gray-800 px-6 py-6 flex flex-col gap-6'>
      <div className='flex items-center gap-4'>
        <IconButton
          title='Go Back'
          handleClick={() => navigate(-1)}
          Icon={IoChevronBack}
        />
        <div>
          <p className='text-darkColor dark:text-lightColor text-lg font-semibold'>
            {layoutTitle}
          </p>
          <p className='text-gray-400 dark:text-gray-400 text-xs font-normal'>
            {layoutSubtitle}
          </p>
        </div>
      </div>
      <div className='grid gap-4 lg:grid-cols-2'>{children}</div>
      <div className='flex justify-end'>
        <Button type='submit' colorScheme='success' handleClick={handleSubmit}>
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
};

export default FormLayout;
