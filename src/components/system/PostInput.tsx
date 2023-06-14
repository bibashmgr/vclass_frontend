import React from 'react';

// components
import Button from '../global/button/Button';

// icons
import { HiPhotograph } from 'react-icons/hi';
import { HiFaceSmile } from 'react-icons/hi2';
import { RiFolderUploadFill } from 'react-icons/ri';

const PostInput = () => {
  return (
    <form className='w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
      <div className='px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800'>
        <textarea
          rows={4}
          className='w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none'
          placeholder='Enter description...'
          name='desc'
          required
        ></textarea>
      </div>
      <div className='flex items-center justify-between px-3 py-2 border-t dark:border-gray-600'>
        <div className='flex pl-0 space-x-1 sm:pl-2'>
          <button
            type='button'
            className='inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
            title='Upload'
          >
            <RiFolderUploadFill className='w-5 h-5' />
          </button>
        </div>
        <Button isSmall colorScheme='info'>
          Post Material
        </Button>
      </div>
    </form>
  );
};

export default PostInput;
