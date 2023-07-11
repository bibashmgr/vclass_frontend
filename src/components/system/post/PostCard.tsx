import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

// schemas
import { postSchema } from '../../../utils/schemas';

// icons
import { FiMoreVertical } from 'react-icons/fi';

// components
import Popover from '../../global/Popover';
import Modal from '../../global/Modal';

// handlers
import { apiHandler } from '../../../handlers/apiHandler';
import { showMessage } from '../../../handlers/messageHandler';

type propsType = {
  post: postSchema;
  isMine: boolean;
  updateCounter: boolean;
  setUpdateCounter: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostCard = ({
  post,
  isMine,
  updateCounter,
  setUpdateCounter,
}: propsType) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const viewPost = () => {
    navigate(`${post._id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`${post._id}/edit`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleYesBtn = async () => {
    const res = await apiHandler('delete', `posts/${post._id}`);

    if (res.success) {
      showMessage(res.message, 'success');
      setIsModalOpen(false);
      setUpdateCounter(!updateCounter);
    } else {
      showMessage(res.message, 'failure');
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        handleYes={handleYesBtn}
        onClose={() => setIsModalOpen(false)}
        title={'Are you sure you want to delete this post?'}
        colorScheme={'failure'}
      />
      <div
        className='flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg px-6 py-5 cursor-pointer'
        onClick={viewPost}
      >
        <div className='flex gap-4 items-center'>
          <img
            src={post.user.avatar}
            alt='avatar'
            className={`w-10 h-10 rounded-md`}
          />
          <div className='flex flex-col gap-1 justify-center'>
            <p className='text-gray-900 dark:text-white text-md'>
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
          <Popover
            parentElement={
              <button
                type='button'
                className='inline-flex justify-center p-2 text-gray-500 rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
                title='More'
              >
                <FiMoreVertical className='w-5 h-5' />
              </button>
            }
          >
            <div
              className='px-4 py-2.5 hover:opacity-75 cursor-pointer'
              onClick={handleEdit}
            >
              Edit
            </div>
            <div
              className='px-4 py-2.5 hover:opacity-75 cursor-pointer'
              onClick={handleDelete}
            >
              Delete
            </div>
          </Popover>
        )}
      </div>
    </>
  );
};

export default PostCard;
