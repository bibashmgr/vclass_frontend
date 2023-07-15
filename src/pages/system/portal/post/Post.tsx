import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// components
import PostCard from '../../../../components/system/post/PostCard';
import Button from '../../../../components/global/button/Button';
import Spinner from '../../../../components/global/Spinner';

// schemas
import { postSchema } from '../../../../utils/schemas';

// handlers
import { apiHandler } from '../../../../handlers/apiHandler';
import { showMessage } from '../../../../handlers/messageHandler';

// context
import { useUserInfo } from '../../../../context/UserInfoContext';
import IconButton from '../../../../components/global/button/IconButton';

// icons
import { BiPlus } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';

const Post = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userInfoContext = useUserInfo();

  const [posts, setPosts] = useState<postSchema[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [updateCounter, setUpdateCounter] = useState<boolean>(false);

  const getPosts = async () => {
    const res = await apiHandler(
      'get',
      `posts/${
        userInfoContext?.userInfo?.role === 'student'
          ? userInfoContext.userInfo.batch
          : params.batchId
      }/${params.subjectId}`
    );

    if (res.success) {
      setPosts(res.data);
      setIsLoading(false);
    } else {
      showMessage(res.message, 'failure');
    }
  };

  useEffect(() => {
    getPosts();
  }, [updateCounter]);

  return (
    <div className='py-4 flex flex-col gap-4'>
      {isLoading ? (
        <div className='flex justify-center pt-4'>
          <Spinner boxSize={5} />
        </div>
      ) : posts.length === 0 ? (
        <div className='flex flex-col items-center gap-2 pt-4'>
          <p className='text-gray-400 dark:text-gray-400 text-sm font-medium'>
            No Posts
          </p>
          <Button isSmall handleClick={() => navigate('create')}>
            Add Post
          </Button>
        </div>
      ) : (
        <>
          <div className='flex justify-end gap-2'>
            {userInfoContext?.userInfo?.role === 'teacher' && (
              <IconButton
                Icon={BsFillPeopleFill}
                iconSize={5}
                title='View Stats'
                handleClick={() => navigate('stats')}
              />
            )}
            <IconButton
              Icon={BiPlus}
              iconSize={5}
              title='Add Post'
              handleClick={() => navigate('create')}
            />
          </div>
          <div className='flex flex-col gap-4'>
            {posts.map((post, index) => {
              if (post.category !== 'submission') {
                return (
                  <PostCard
                    key={index}
                    post={post}
                    isMine={post.user._id === userInfoContext?.userInfo?._id}
                    updateCounter={updateCounter}
                    setUpdateCounter={setUpdateCounter}
                  />
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
