import React, { useState, useEffect, Suspense } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';

// icons
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

// schemas
import { userAttendanceStatsSchema } from '../../../utils/schemas';

type propsType = {
  stats: userAttendanceStatsSchema;
};

const DailyStatsCard = ({ stats }: propsType) => {
  const [activeDate, setActiveDate] = useState(new Date());

  return (
    <div className='flex flex-col gap-4 items-start justify-start bg-white dark:bg-gray-800 px-6 py-6 rounded-lg'>
      <div>
        <p className='text-gray-900 dark:text-white font-semibold text-md'>
          Daily Stats
        </p>
        <p className='text-gray-400 dark:text-gray-400 text-[10px] font-normal'>
          Show stats of each day
        </p>
      </div>
      <Suspense
        fallback={
          <div className='animate-pulse flex w-full h-full justify-between'>
            <div
              className={`h-full bg-gray-200 rounded-lg dark:bg-gray-700 w-full`}
            />
          </div>
        }
      >
        <div className='w-full flex flex-col gap-4 justify-center items-center'>
          <CalenderHeader
            activeDate={activeDate}
            setActiveDate={setActiveDate}
          />
          <div className='w-full flex flex-col gap-2 justify-center items-center'>
            <CalenderBodyTitle activeDate={activeDate} />
            <CalenderBodyContent stats={stats} activeDate={activeDate} />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default DailyStatsCard;

const CalenderHeader = ({
  activeDate,
  setActiveDate,
}: {
  activeDate: Date;
  setActiveDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  return (
    <div className='flex justify-between items-center w-full'>
      <MdChevronLeft
        className='w-10 h-10 text-gray-900 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer'
        onClick={() => setActiveDate(subMonths(activeDate, 1))}
      />
      <h2 className='text-gray-900 dark:text-white font-semibold text-md'>
        {format(activeDate, 'MMMM yyyy')}
      </h2>
      <MdChevronRight
        className='w-10 h-10 text-gray-900 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer'
        onClick={() => setActiveDate(addMonths(activeDate, 1))}
      />
    </div>
  );
};

const CalenderBodyTitle = ({ activeDate }: { activeDate: Date }) => {
  const [weekStartDate] = useState(startOfWeek(activeDate));

  return (
    <div className='grid grid-cols-7 gap-4 sm:gap-x-10 sm:gap-y-6'>
      {Array(7)
        .fill('')
        .map((_, index) => {
          return (
            <div
              className='w-8 sm:w-10 h-8 sm:h-10 flex justify-center items-center text-gray-400 dark:text-gray-500 font-semibold text-sm text-center '
              key={index}
            >
              {format(addDays(weekStartDate, index), 'E')}
            </div>
          );
        })}
    </div>
  );
};

const CalenderBodyContent = ({
  stats,
  activeDate,
}: {
  stats: userAttendanceStatsSchema;
  activeDate: Date;
}) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  useEffect(() => {
    let firstDayOfMonth = startOfMonth(activeDate);
    let lastDayOfMonth = endOfMonth(activeDate);

    setStartDate(startOfWeek(firstDayOfMonth));
    setEndDate(endOfWeek(lastDayOfMonth));
  }, [activeDate]);

  const getDateStyles = (current: Date): string => {
    let totalDates = stats?.portal?.activeDates;
    let presentDates = stats?.activeDates;

    let isIncluded = totalDates.find((d) => isSameDay(new Date(d), current));

    if (isIncluded) {
      let isPresent = presentDates.find((d) => isSameDay(new Date(d), current));

      if (isPresent) {
        return 'text-gray-900 dark:text-white bg-emerald-500';
      } else {
        return 'text-gray-900 dark:text-white bg-red-500';
      }
    } else {
      return 'text-gray-900 dark:text-white';
    }
  };

  const generateDates = (): React.ReactNode => {
    let currentDate = startDate;
    const allWeeks = [];

    while (currentDate! <= endDate!) {
      let week = [];

      for (let day = 0; day < 7; day++) {
        week.push(
          <div
            key={currentDate?.getTime()}
            className={`w-8 sm:w-10 h-8 sm:h-10 flex justify-center items-center rounded-md font-normal text-xs sm:text-sm ${
              isSameMonth(currentDate!, activeDate)
                ? getDateStyles(currentDate!)
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {format(currentDate!, 'd')}
          </div>
        );

        currentDate = addDays(currentDate!, 1);
      }

      allWeeks.push(week);
    }

    return allWeeks;
  };

  return (
    <Suspense fallback={<DateSkeleton />}>
      <div className='grid grid-cols-7 gap-4 sm:gap-x-10 sm:gap-y-6'>
        {generateDates()}
      </div>
    </Suspense>
  );
};

const DateSkeleton = () => {
  return (
    <div className='animate-pulse flex flex-col w-full h-full justify-between px-4 gap-4'>
      {Array(5)
        .fill('')
        .map((_, idx) => {
          return (
            <div
              key={idx}
              className={`h-10 bg-gray-200 rounded-md dark:bg-gray-700 w-full`}
            />
          );
        })}
    </div>
  );
};
