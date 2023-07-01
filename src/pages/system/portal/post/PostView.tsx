import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// schemas
import { postSchema } from '../../../../utils/schemas';

// handlers
import { apiHandler } from '../../../../handlers/apiHandler';
import { showMessage } from '../../../../handlers/messageHandler';

// icons
import { FiMoreVertical } from 'react-icons/fi';
import moment from 'moment';
import { BsFileEarmarkFill } from 'react-icons/bs';
import { config } from '../../../../config/config';

const PostView = () => {
  const params = useParams();
  const [post, setPost] = useState<postSchema>();

  const getPost = async () => {
    const res = await apiHandler('get', `posts/${params.postId}`);

    if (res.success) {
      setPost(res.data);
      console.log(res.data);
    } else {
      showMessage(res.message, 'failure');
    }
  };

  const handleDownloadFile = async (fileName: string) => {
    window.open(`${config.SERVER_BASE_URL}/files/${fileName}`, '_blank');
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className='py-4'>
      <div className='flex justify-between items-center pb-4 border-b border-gray-300 dark:border-gray-600'>
        <div className='flex flex-col gap-1'>
          <p className='text-darkColor dark:text-lightColor text-2xl font-semibold'>
            {post?.title}
          </p>
          <div className='flex gap-2 justify-center text-gray-400 dark:text-gray-400 text-xs font-normal'>
            <p>{post?.user.name}</p>
            <p>·</p>
            <p>{moment(post?.createdAt.toString()).format('ll')}</p>
          </div>
        </div>
        <button
          type='button'
          className='inline-flex justify-center p-2 text-gray-500 rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
          title='More'
        >
          <FiMoreVertical className='w-5 h-5' />
        </button>
      </div>
      <div className='py-4 flex flex-col gap-6'>
        {post?.desc && (
          <p className='text-darkColor dark:text-lightColor text-md'>
            {post?.desc}
          </p>
        )}
        {post?.files && (
          <div className='flex justify-start items-center gap-4'>
            {post.files.map((file, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-col gap-2 justify-center items-center relative px-2 py-2  text-gray-400 dark:text-gray-300 hover:text-gray-200 dark:hover:text-white rounded-lg cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600'
                  onClick={() => handleDownloadFile(file.filename)}
                  title='Download'
                >
                  <BsFileEarmarkFill className='w-14 h-14' />
                  <p className='text-xs font-normal'>
                    {file.filename.split('_')[1]}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostView;
