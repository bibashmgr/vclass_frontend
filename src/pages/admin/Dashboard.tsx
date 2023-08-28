import React from 'react';

// components
import StatusCard from '../../components/global/StatusCard';

// icons
import { IoGrid } from 'react-icons/io5';
import { RiBook2Fill } from 'react-icons/ri';
import { FaGraduationCap } from 'react-icons/fa';
import { BsStack, BsPersonFill } from 'react-icons/bs';

// context
import { useUserInfo } from '../../context/UserInfoContext';

const Dashboard = () => {
  const userInfoContext = useUserInfo();

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-6 rounded-lg'>
        <img
          src={userInfoContext?.userInfo?.avatar}
          className='rounded-lg w-12 h-12'
        />
        <div className='flex flex-col'>
          <p className='text-gray-900 dark:text-white font-bold text-lg'>
            {userInfoContext?.userInfo?.name}
          </p>
          <p className='text-gray-400 font-semibold text-xs'>
            {userInfoContext?.userInfo?.email}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatusCard
          title='00'
          subtitle='Subjects'
          Icon={RiBook2Fill}
          colorScheme='failure'
        />
        <StatusCard
          title='00'
          subtitle='Faculties'
          Icon={FaGraduationCap}
          colorScheme='success'
        />
        <StatusCard
          title='00'
          subtitle='Batches'
          Icon={BsStack}
          colorScheme='info'
        />
        <StatusCard
          title='00'
          subtitle='Users'
          Icon={BsPersonFill}
          colorScheme='warn'
        />
      </div>
    </div>
  );
};

export default Dashboard;
