import React, { ChangeEvent, useState } from 'react';

// icons
import { IoTime } from 'react-icons/io5';
import Popover from '../Popover';
import Button from '../button/Button';

type propsType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  isDisabled: boolean;
};

const TimePicker = ({ value, setValue, error, isDisabled }: propsType) => {
  const [period, setPeriod] = useState('am');
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
  });

  const handlePeriod = (e: React.MouseEvent) => {
    const target = e.target as Element;
    setPeriod(target.id);
  };

  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirm = () => {
    if (time.hours > 11) {
      time.hours = 11;
    } else if (time.hours < 0) {
      time.hours = 0;
    }

    if (time.minutes > 59) {
      time.minutes = 59;
    } else if (time.minutes < 0) {
      time.minutes = 0;
    }

    let formattedTime = `${time.hours > 9 ? time.hours : `0${time.hours}`}:${
      time.minutes > 9 ? time.minutes : `0${time.minutes}`
    } ${period.toUpperCase()}`;

    setValue(formattedTime);
  };

  return (
    <div className={`flex flex-col gap-2`}>
      <div className='flex items-center gap-1'>
        <label
          htmlFor='date'
          className={` ${
            isDisabled ? 'text-gray-400/40 ' : 'text-gray-400'
          } text-sm font-semibold`}
        >
          Time:
        </label>

        {error && <p className='text-xs text-red-500 font-normal'>{error}</p>}
      </div>
      <Popover
        parentElement={
          <div className='relative'>
            <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
              <IoTime
                className={`w-5 h-5 ${
                  isDisabled
                    ? 'text-gray-500/50 dark:text-gray-400/50'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                aria-hidden='true'
              />
            </div>
            <input
              type='text'
              name='time'
              value={value}
              readOnly
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed'
              placeholder='Select time'
              onChange={handleTime}
              required={true}
              disabled={isDisabled}
            />
          </div>
        }
        popDirection='left'
        isDisabled={isDisabled}
      >
        <div className='flex flex-col gap-4 px-2 py-2'>
          <div className='flex items-start gap-2'>
            <div className='flex items-start gap-2'>
              <div className='flex flex-col gap-1'>
                <input
                  type='number'
                  min={0}
                  max={11}
                  name='hours'
                  value={time.hours}
                  onChange={handleTime}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-20 px-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <p className='text-xs cursor-default text-gray-400'>Hours</p>
              </div>
              <p className='text-gray-400 font-bold text-lg'>:</p>
              <div className='flex flex-col gap-1'>
                <input
                  type='number'
                  min={0}
                  max={59}
                  name='minutes'
                  value={time.minutes}
                  onChange={handleTime}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-20 px-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <p className='text-xs cursor-default text-gray-400'>Minutes</p>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <p
                id='am'
                className={`px-1.5 py-1 text-[10px] font-bold text-white rounded text-center cursor-pointer ${
                  period === 'am'
                    ? 'bg-blue-500'
                    : 'bg-gray-300 dark:text-gray-600'
                }`}
                onClick={handlePeriod}
              >
                AM
              </p>
              <p
                id='pm'
                className={`px-1.5 py-1 text-[10px] font-bold text-white rounded text-center cursor-pointer ${
                  period === 'pm'
                    ? 'bg-blue-500'
                    : 'bg-gray-300 dark:text-gray-600'
                }`}
                onClick={handlePeriod}
              >
                PM
              </p>
            </div>
          </div>
          <Button colorScheme='info' isSmall handleClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default TimePicker;
