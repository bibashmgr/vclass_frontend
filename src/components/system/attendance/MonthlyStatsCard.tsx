import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// schemas
import { userAttendanceStatsSchema } from '../../../utils/schemas';

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
  const [monthlyStats, setMonthlyStats] = useState<monthlyStatsSchema[]>([]);

  useEffect(() => {
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
  }, []);

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
      </div>
    </div>
  );
};

export default MonthlyStatsCard;
