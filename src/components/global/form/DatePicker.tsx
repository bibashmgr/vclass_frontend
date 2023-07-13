import React from 'react';

const DatePicker = () => {
  return (
    <div className={`flex flex-col gap-2`}>
      <label
        htmlFor="date"
        className="text-gray-400 dark:text-gray-400 text-sm font-semibold"
      >
        Date:
      </label>
    </div>
  );
};

export default DatePicker;
