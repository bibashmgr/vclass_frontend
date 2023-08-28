import { useEffect, useState } from 'react';

// components
import StatusCard from '../../components/global/StatusCard';

// icons
import { RiBook2Fill } from 'react-icons/ri';
import { FaGraduationCap } from 'react-icons/fa';
import { BsStack, BsPersonFill } from 'react-icons/bs';

// context
import { useUserInfo } from '../../context/UserInfoContext';

// handlers
import { apiHandler } from '../../handlers/apiHandler';
import { showMessage } from '../../handlers/messageHandler';

// schemas
import { dashboardInfoSchema } from '../../utils/schemas';
import { numberTrimmer } from '../../utils/trimmer';

const Dashboard = () => {
  const userInfoContext = useUserInfo();

  const [dashboardInfo, setDashboardInfo] = useState<dashboardInfoSchema>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDashboardInfo = async () => {
    await apiHandler('get', 'dashboard', null).then((res) => {
      if (res.success) {
        setDashboardInfo(res.data);
        setIsLoading(false);
      } else {
        showMessage(res.message, 'failure');
      }
    });
  };

  useEffect(() => {
    getDashboardInfo();
  }, []);

  return (
    <>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
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
              title={numberTrimmer(dashboardInfo?.subjects!)}
              subtitle='Subjects'
              Icon={RiBook2Fill}
              colorScheme='failure'
            />
            <StatusCard
              title={numberTrimmer(dashboardInfo?.faculties!)}
              subtitle='Faculties'
              Icon={FaGraduationCap}
              colorScheme='success'
            />
            <StatusCard
              title={numberTrimmer(dashboardInfo?.batches!)}
              subtitle='Batches'
              Icon={BsStack}
              colorScheme='info'
            />
            <StatusCard
              title={numberTrimmer(dashboardInfo?.users!)}
              subtitle='Users'
              Icon={BsPersonFill}
              colorScheme='warn'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

const DashboardSkeleton = () => {
  return (
    <div className='flex flex-col gap-4 animate-pulse'>
      <div className='h-[100px] bg-gray-300 rounded-lg dark:bg-gray-800 w-full' />
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='h-[100px] bg-gray-300 rounded-lg dark:bg-gray-800 w-full' />
        <div className='h-[100px] bg-gray-300 rounded-lg dark:bg-gray-800 w-full' />
        <div className='h-[100px] bg-gray-300 rounded-lg dark:bg-gray-800 w-full' />
        <div className='h-[100px] bg-gray-300 rounded-lg dark:bg-gray-800 w-full' />
      </div>
    </div>
  );
};
