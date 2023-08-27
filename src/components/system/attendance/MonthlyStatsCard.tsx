import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// schemas
import { userAttendanceStatsSchema } from '../../../utils/schemas';
import Spinner from '../../global/Spinner';

let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

type propsType = {
  stats: userAttendanceStatsSchema;
};

type monthlyStatsSchema = {
  name: string;
  presence: number;
  absence: number;
};

const MonthlyStatsCard = ({ stats }: propsType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [monthlyStats, setMonthlyStats] = useState<monthlyStatsSchema[]>([]);

  const groupDates = (dates: Date[]) => {
    const groupedDates: any = {};

    dates.forEach((d) => {
      const dt = new Date(d);
      const date = dt.getDate();
      const year = dt.getFullYear();
      const month = dt.getMonth() + 1;

      const key = `${year}-${month}`;
      if (key in groupedDates) {
        groupedDates[key] = [...groupedDates[key], date];
      } else {
        groupedDates[key] = [date];
      }
    });

    return groupedDates;
  };

  const setStats = () => {
    let statsData: monthlyStatsSchema[] = [];
    let sortedTotalDates = stats.portal.activeDates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    let sortedActiveDates = stats.activeDates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    let groupedTotalDates = groupDates(sortedTotalDates);
    let groupedActiveDates = groupDates(sortedActiveDates);

    Object.keys(groupedTotalDates).map((key) => {
      let name = months[Number(key.split('-')[1]) - 1];
      let totalDates = groupedTotalDates[key]?.length || 0;
      let presentDates = groupedActiveDates[key]?.length || 0;

      let presence = Math.floor((presentDates / totalDates) * 100);
      let absence = 100 - presence;

      statsData.push({
        name,
        presence,
        absence,
      });
    });

    let remainingMonth = 6 - statsData.length;
    let lastMonthIndex = months.indexOf(statsData[statsData.length - 1]?.name);

    Array(remainingMonth)
      .fill('')
      .map((_, idx) => {
        let currentIndex = lastMonthIndex + idx + 1;

        if (currentIndex >= 12) {
          currentIndex = currentIndex - 12;
        }

        statsData.push({
          name: months[currentIndex],
          presence: 0,
          absence: 0,
        });
      });

    setMonthlyStats(statsData);
    setIsLoading(false);
  };

  useEffect(() => {
    setStats();
  }, []);

  return (
    <div className='flex flex-col gap-4 items-start justify-start bg-white dark:bg-gray-800 px-6 py-6 rounded-lg'>
      <div>
        <p className='text-gray-900 dark:text-white font-semibold text-md'>
          Monthly Stats
        </p>
        <p className='text-gray-400 dark:text-gray-400 text-[10px] font-normal'>
          Show stats of each month
        </p>
      </div>
      <div className='w-full h-[300px] lg:h-[400px]'>
        {isLoading ? (
          <BarChartSkeleton />
        ) : (
          <ResponsiveContainer>
            <BarChart data={monthlyStats} margin={{ left: -32 }} barGap={0}>
              <XAxis
                dataKey='name'
                axisLine={false}
                tickLine={false}
                fontSize={12}
                fontWeight='bold'
                fontFamily='Open Sans'
                padding={{ left: 16, right: 16 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize={12}
                fontWeight='bold'
                fontFamily='Open Sans'
                padding={{ top: 16, bottom: 16 }}
                domain={[0, 100]}
              />
              <Bar
                dataKey='presence'
                fill='#6EE7B7'
                barSize={12}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey='absence'
                fill='#F87171'
                barSize={12}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MonthlyStatsCard;

const BarChartSkeleton = () => {
  return (
    <div className='flex w-full h-full gap-4'>
      <ul className='flex flex-col justify-between list-none text-gray-500 font-bold text-xs pb-8'>
        <li>100</li>
        <li>75</li>
        <li>50</li>
        <li>25</li>
        <li>0</li>
      </ul>

      <div className='w-full h-full flex flex-col gap-4'>
        <div className='animate-pulse flex w-full h-full justify-between'>
          <div className='flex items-end'>
            <div
              className={`h-5/6 bg-gray-200 rounded-t dark:bg-gray-700 w-4`}
            />
            <div
              className={`h-1/6 bg-gray-200 rounded-t dark:bg-gray-700 w-4`}
            />
          </div>
          <div className='flex items-end'>
            <div
              className={`h-4/6 bg-gray-200 rounded-t dark:bg-gray-700 w-4`}
            />
            <div
              className={`h-2/6 bg-gray-200 rounded-t dark:bg-gray-700 w-4`}
            />
          </div>
          <div className='flex items-end'>
            <div
              className={`h-2/5 bg-gray-200 rounded-t dark:bg-gray-700 w-4`}
            />
            <div
              className={`h-3/5 bg-gray-200 rounded-t dark:bg-gray-700 w-4`}
            />
          </div>
          <div className='flex items-end'>
            <div
              className={`h-1/6 bg-gray-200 rounded-t dark:bg-gray-700 w-4`}
            />
            <div
              className={`h-5/6 bg-gray-200 rounded-t dark:bg-gray-700 w-4`}
            />
          </div>
          <div className='flex items-end'>
            <div
              className={`h-2/3 bg-gray-200 rounded-t dark:bg-gray-700 w-4`}
            />
            <div
              className={`h-1/3 bg-gray-200 rounded-t dark:bg-gray-700 w-4`}
            />
          </div>
          <div className='flex items-end'>
            <div
              className={`h-1/4 bg-gray-200 rounded-t dark:bg-gray-700 w-4`}
            />
            <div
              className={`h-3/4 bg-gray-200 rounded-t dark:bg-gray-700 w-4`}
            />
          </div>
        </div>
        <ul className='flex justify-between list-none text-gray-500 font-bold text-xs'>
          <li>A</li>
          <li>B</li>
          <li>C</li>
          <li>D</li>
          <li>E</li>
          <li>F</li>
        </ul>
      </div>
    </div>
  );
};
