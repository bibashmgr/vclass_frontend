import React from 'react';
import ReactDOM from 'react-dom';

// icons
import { MdClose, MdInfoOutline } from 'react-icons/md';

// components
import Button from './Button';

type propsType = {
  isOpen: boolean;
  onClose: React.MouseEventHandler;
  handleYes: React.MouseEventHandler;
  title: string;
  colorScheme: string;
};

const Modal = ({
  isOpen,
  onClose,
  handleYes,
  title,
  colorScheme,
}: propsType) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='fixed z-40 w-screen h-screen max-h-screen top-0 left-0 right-0 bottom-0'>
      <div
        className='w-screen h-screen fixed top-0 left-0 z-40 bg-black/25'
        onClick={onClose}
      ></div>
      <div className='relative w-full z-50 flex justify-center items-center mt-12'>
        <div className='relative bg-white rounded-lg shadow-light dark:shadow dark:bg-gray-700'>
          <button
            type='button'
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
            onClick={onClose}
          >
            <MdClose className='w-5 h-5' />
          </button>
          <div className='p-6 text-center'>
            <MdInfoOutline className='mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              {title}
            </h3>
            <div className='flex gap-2 justify-center'>
              <Button
                type='button'
                colorScheme={colorScheme}
                handleClick={handleYes}
              >
                Yes, I'm sure
              </Button>
              <Button type='button' handleClick={onClose}>
                No, cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Modal;
