import React from 'react';
import moment from 'moment';

// schemas
import { postSchema } from '../../../utils/schemas';

// icons
import { FiMoreVertical } from 'react-icons/fi';

type propsType = {
  post: postSchema;
  isMine: boolean;
};

const PostCard = ({ post, isMine }: propsType) => {
  return (
    <div className='flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg px-6 py-5'>
      <div className='flex gap-4 items-center'>
        <img
          src={post.user.avatar}
          alt='avatar'
          className={`w-10 h-10 rounded-md`}
        />
        <div className='flex flex-col gap-1 justify-center'>
          <p className='text-darkColor dark:text-lightColor text-md'>
            {`${isMine ? 'You' : post.user.name} posted a new ${
              post.category
            }: ${post.title}`}
          </p>
          <p className='text-gray-400 dark:text-gray-400 text-xs font-normal'>
            {moment(post.createdAt.toString()).format('ll')}
          </p>
        </div>
      </div>
      {isMine && (
        <button
          type='button'
          className='inline-flex justify-center p-2 text-gray-500 rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
          title='More'
        >
          <FiMoreVertical className='w-5 h-5' />
        </button>
      )}
    </div>
  );
};

export default PostCard;
