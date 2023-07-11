import React, { useState } from 'react';

// icons
import { MdOutlineKeyboardArrowDown, MdClose } from 'react-icons/md';

type optionType = {
  title: string | number;
  value: string | number;
  isChecked: boolean;
};

type propsType = {
  hasLabel?: boolean;
  label?: string;
  name: string;
  options: optionType[];
  setOptions: React.Dispatch<React.SetStateAction<any>>;
  placeHolder?: string;
  faculty: any;
  setFaculty: React.Dispatch<React.SetStateAction<any>>;
  tabIndex: number;
};

const MultiSelectField = ({
  hasLabel = false,
  label,
  name,
  options,
  setOptions,
  placeHolder = 'Select an option',
  faculty,
  setFaculty,
  tabIndex,
}: propsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (e: React.MouseEvent) => {
    let el = e.target as HTMLElement;
    if (el.dataset.value) {
      setFaculty((prev: any) => ({
        ...prev,
        semesters: prev.semesters.map(
          (semester: any, semesterIndex: Number) => {
            if (semesterIndex === tabIndex) {
              semester = [
                ...semester,
                {
                  title: el.innerText,
                  value: el.dataset.value,
                },
              ];
            }
            return semester;
          }
        ),
      }));
      setOptions(
        options.map((option) => {
          if (option.value === el.dataset.value) {
            option.isChecked = true;
          }
          return option;
        })
      );
    }
    setIsOpen(false);
  };

  const handleRemove = (e: React.MouseEvent, value: string | number) => {
    e.stopPropagation();

    setFaculty((prev: any) => ({
      ...prev,
      semesters: prev.semesters.map((semester: any, semesterIndex: Number) => {
        if (semesterIndex === tabIndex) {
          semester = semester.filter((s: any) => s.value !== value);
        }
        return semester;
      }),
    }));
    setOptions(
      options.map((option) => {
        if (option.value === value) {
          option.isChecked = false;
        }
        return option;
      })
    );
  };

  return (
    <div className='flex flex-col gap-2'>
      {hasLabel && (
        <label
          htmlFor={name}
          className='text-gray-400 dark:text-gray-400 text-sm font-semibold'
        >
          {label}:
        </label>
      )}
      <div
        className={`bg-gray-50 border border-gray-300 rounded-md w-full px-2.5 dark:bg-gray-700 dark:border-gray-600  cursor-pointer flex items-center justify-between gap-6 ${
          faculty.semesters[tabIndex]?.length === 0 ? 'py-2' : 'py-1.5'
        }`}
        onClick={handleClick}
      >
        <div>
          {faculty.semesters[tabIndex]?.length === 0 ? (
            <p className='text-sm text-gray-400'>{placeHolder}</p>
          ) : (
            <div className='flex gap-2 flex-wrap'>
              {faculty.semesters[tabIndex]?.map(
                (option: any, optionIndex: number) => {
                  return (
                    <div
                      key={optionIndex}
                      className='px-2 py-1.5 text-gray-500 bg-white text-xs rounded-md font-medium dark:bg-gray-700 border border-gray-200  dark:text-gray-300 dark:border-gray-500  flex gap-2 items-center'
                    >
                      <p>{option.title}</p>
                      <MdClose
                        className='w-4 h-4 text-gray-400 hover:opacity-75 cursor-pointer'
                        onClick={(e) => handleRemove(e, option.value)}
                      />
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
        <MdOutlineKeyboardArrowDown className='w-6 h-6 min-w-6 min-h-6 text-gray-400 cursor-pointer' />
      </div>
      <div className='relative'>
        <div
          className={`absolute z-10 left-0 right-0 top-0 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-light dark:shadow-none cursor-pointer max-h-36 overflow-y-auto ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {options?.map((option, optionIndex) => {
            if (!option.isChecked) {
              return (
                <p
                  key={optionIndex}
                  data-value={option.value}
                  className='px-2 py-1 hover:bg-blue-500 hover:text-white'
                  onClick={handleSelect}
                >
                  {option.title}
                </p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default MultiSelectField;
