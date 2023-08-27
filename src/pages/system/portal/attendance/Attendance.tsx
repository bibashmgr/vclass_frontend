import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

// components
import Button from '../../../../components/global/button/Button';
import StatusCard from '../../../../components/global/StatusCard';
import Badge from '../../../../components/global/Badge';

// layouts
import ListLayout from '../../../../layouts/crud_layouts/ListLayout';

// icons
import { IoCalendar } from 'react-icons/io5';
import { TiGroup } from 'react-icons/ti';

// utils
import { attendanceStatsHeader } from '../../../../utils/tableHeaders';
import { attendanceStatsSchema } from '../../../../utils/schemas';

// handlers
import { apiHandler } from '../../../../handlers/apiHandler';

// context
import { useUserInfo } from '../../../../context/UserInfoContext';
import Spinner from '../../../../components/global/Spinner';
import { showMessage } from '../../../../handlers/messageHandler';
import { numberTrimmer } from '../../../../utils/trimmer';

const Attendance = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userInfoContext = useUserInfo();

  const [date, setDate] = useState<DateValueType>({
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchCounter, setFetchCounter] = useState<boolean>(false);
  const [attendance, setAttendance] = useState<attendanceStatsSchema>();

  const handleDate = (newValue: any) => {
    setDate(newValue);

    setIsLoading(true);
    setFetchCounter(!fetchCounter);
  };

  const getAttendanceStats = async () => {
    const res = await apiHandler(
      'get',
      `attendances/${
        userInfoContext?.userInfo?.role === 'student'
          ? userInfoContext.userInfo.batch
          : params.batchId
      }/${params.subjectId}/?date=${dayjs(date?.startDate).format(
        'YYYY-MM-DD'
      )}`,
      null
    );

    if (res.success) {
      setAttendance(res.data);
      setIsLoading(false);
    } else {
      setAttendance({
        totalAbsents: 0,
        totalPresents: 0,
        students: [],
      });
      setIsLoading(false);
      showMessage(res.message, 'failure');
    }
  };

  useEffect(() => {
    getAttendanceStats();
  }, [fetchCounter]);

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center py-8'>
          <Spinner boxSize={5} />
        </div>
      ) : (
        <div className='flex flex-col gap-4 py-4'>
          <div className='flex gap-2 justify-end items-center'>
            <div className='w-36'>
              <Datepicker
                value={date!}
                onChange={handleDate}
                asSingle={true}
                useRange={false}
                primaryColor='blue'
                popoverDirection='down'
                toggleIcon={(open) => (
                  <IoCalendar
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400`}
                  />
                )}
                readOnly={true}
                classNames={{
                  input(p) {
                    return 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 relative';
                  },
                  toggleButton(p) {
                    return 'absolute top-1/2 right-3 -translate-y-1/2 text-gray-400';
                  },
                }}
              />
            </div>
            <Button
              colorScheme='info'
              isSmall
              handleClick={() => navigate('mark')}
            >
              Mark
            </Button>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            <StatusCard
              Icon={TiGroup}
              colorScheme='success'
              title={numberTrimmer(attendance?.totalPresents!)}
              subtitle='Total Present Students'
            />
            <StatusCard
              Icon={TiGroup}
              colorScheme='failure'
              title={numberTrimmer(attendance?.totalAbsents!)}
              subtitle='Total Absent Students'
            />
            <StatusCard
              Icon={TiGroup}
              colorScheme='info'
              title={numberTrimmer(attendance?.students.length!)}
              subtitle='Total Students'
            />
          </div>
          <ListLayout
            tableHeader={attendanceStatsHeader}
            layoutTitle='Students'
            layoutSubtitle={`${attendance?.students?.length} students joined`}
            isEmpty={(attendance?.students.length as Number) === 0}
            isLoading={isLoading}
            hasCreateBtn={false}
          >
            {attendance?.students.map((student, studentIndex) => {
              return (
                <tr key={studentIndex} className='bg-white dark:bg-gray-800'>
                  <td className='px-6 py-4'>
                    {numberTrimmer(studentIndex + 1)}
                  </td>
                  <td className='px-6 py-4 capitalize'>{student?.name}</td>
                  <td className='px-6 py-4'>{student?.email}</td>
                  <td className='px-6 py-4'>
                    <Badge
                      title={student?.status}
                      colorScheme={student?.status}
                    />
                  </td>
                  <td className='px-6 py-4'>
                    <Button
                      handleClick={() => {
                        navigate(student._id);
                      }}
                      colorScheme='success'
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </ListLayout>
        </div>
      )}
    </>
  );
};

export default Attendance;
