import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// icons
import { TiGroup } from 'react-icons/ti';

// components
import StatusCard from '../../../../components/global/StatusCard';
import Spinner from '../../../../components/global/Spinner';
import MonthlyStatsCard from '../../../../components/system/attendance/MonthlyStatsCard';
import DailyStatsCard from '../../../../components/system/attendance/DailyStatsCard';

// handlers
import { apiHandler } from '../../../../handlers/apiHandler';

// context
import { useUserInfo } from '../../../../context/UserInfoContext';

// utils
import { userAttendanceStatsSchema } from '../../../../utils/schemas';
import { numberTrimmer } from '../../../../utils/trimmer';

const AttendanceView = () => {
  const params = useParams();
  const userInfoContext = useUserInfo();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<userAttendanceStatsSchema>();

  const getUserAttendanceStats = async () => {
    const res = await apiHandler(
      'get',
      `attendances/${
        userInfoContext?.userInfo?.role === 'student'
          ? userInfoContext.userInfo.batch
          : params.batchId
      }/${params.subjectId}/${
        userInfoContext?.userInfo?.role === 'student'
          ? userInfoContext.userInfo._id
          : params.userId
      }`,
      null
    );

    if (res.success) {
      setStats(res.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserAttendanceStats();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center py-8'>
          <Spinner boxSize={5} />
        </div>
      ) : (
        <div className='flex flex-col gap-4 py-4'>
          {userInfoContext?.userInfo?.role === 'teacher' && (
            <div className='flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-6 rounded-lg'>
              <img src={stats?.user.avatar} className='rounded-lg w-12 h-12' />
              <div className='flex flex-col'>
                <p className='text-gray-900 dark:text-white font-bold text-lg'>
                  {stats?.user.name}
                </p>
                <p className='text-gray-400 font-semibold text-xs'>
                  {stats?.user.email}
                </p>
              </div>
            </div>
          )}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            <StatusCard
              Icon={TiGroup}
              colorScheme='success'
              title={
                stats?.portal?.activeDates.length === 0
                  ? '00'
                  : numberTrimmer(stats?.activeDates.length!)
              }
              subtitle='Total Present Days'
            />
            <StatusCard
              Icon={TiGroup}
              colorScheme='failure'
              title={
                stats?.portal?.activeDates.length === 0
                  ? '00'
                  : numberTrimmer(
                      stats?.portal?.activeDates.length! -
                        stats?.activeDates.length!
                    )
              }
              subtitle='Total Absent Days'
            />
            <StatusCard
              Icon={TiGroup}
              colorScheme='info'
              title={
                stats?.portal?.activeDates.length === 0
                  ? '00%'
                  : `${numberTrimmer(
                      Math.floor(
                        (stats?.activeDates.length! /
                          stats?.portal?.activeDates.length!) *
                          100
                      )
                    )}%`
              }
              subtitle='Present Percentage'
            />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <MonthlyStatsCard stats={stats!} />
            <DailyStatsCard stats={stats!} />
          </div>
        </div>
      )}
    </>
  );
};

export default AttendanceView;
