import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

// schemas
import {
  fileSchema,
  postFileSchema,
  postSchema,
} from '../../../../utils/schemas';

// handlers
import { apiHandler } from '../../../../handlers/apiHandler';
import { showMessage } from '../../../../handlers/messageHandler';

// icons
import { FiMoreVertical } from 'react-icons/fi';
import { BsFileEarmarkFill, BsFillCloudArrowUpFill } from 'react-icons/bs';

// config
import { config } from '../../../../config/config';

// context
import { useUserInfo } from '../../../../context/UserInfoContext';

// components
import Popover from '../../../../components/global/Popover';
import Modal from '../../../../components/global/Modal';
import Button from '../../../../components/global/button/Button';

const PostView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userInfoContext = useUserInfo();

  const [post, setPost] = useState<postSchema>();
  const [toSendPost, setToSendPost] = useState({
    category: 'submission',
    files: [] as string[],
    assignmentRef: '',
  });
  const [submittedPost, setSubmittedPost] = useState<postSchema>();
  const [submittedFiles, setSubmittedFiles] = useState<postFileSchema[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [errors, setErrors] = useState({
    files: '',
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getPost = async () => {
    const res = await apiHandler('get', `posts/${params.postId}`);

    if (res.success) {
      setPost(res.data);
      setToSendPost({ ...toSendPost, assignmentRef: res.data._id });

      let subPost = res.data.submittedBy.find(
        (subPost: postSchema) =>
          subPost.user._id === userInfoContext?.userInfo?._id
      );

      if (subPost) {
        setIsSubmitted(true);
        setSubmittedPost(subPost);
        setSubmittedFiles(subPost.files);
      } else {
        setIsSubmitted(false);
      }
    } else {
      showMessage(res.message, 'failure');
    }
  };

  const handleDownloadFile = async (fileName: string) => {
    window.open(`${config.SERVER_BASE_URL}/files/${fileName}`, '_blank');
  };

  const handleEdit = (e: React.MouseEvent) => {
    navigate('edit');
  };

  const handleDelete = (e: React.MouseEvent) => {
    setIsModalOpen(true);
  };

  const handleYesBtn = async () => {
    const res = await apiHandler('delete', `posts/${params.postId}`);

    if (res.success) {
      showMessage(res.message, 'success');
      setIsModalOpen(false);
      navigate(-1);
    } else {
      showMessage(res.message, 'failure');
      setIsModalOpen(false);
    }
  };

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (Object.values(e.target.files).length > 5) {
        setErrors((prev) => ({
          ...prev,
          files: 'Maximum File Selection is 5.',
        }));
      } else {
        const formData = new FormData();

        Object.values(e.target.files).map((file) => {
          formData.append('files', file as Blob, file?.name);
        });

        const res = await apiHandler('post', 'files/create', formData, true);

        if (res.success) {
          let uploadedFileNames: string[] = [];
          let uploadedFiles: postFileSchema[] = [];

          res.data.map((file: fileSchema) => {
            uploadedFileNames.push(file.id);
            uploadedFiles.push({
              _id: file.id,
              filename: file.filename,
            });
          });

          setToSendPost((prev) => ({ ...prev, files: uploadedFileNames }));
          setSubmittedFiles(uploadedFiles);
        } else {
          showMessage(res.message, 'failure');
        }
      }
    }
  };

  const handleRemoveFile = async (fileIndex: number) => {
    const res = await apiHandler(
      'delete',
      `files/${submittedFiles[fileIndex].filename}/delete`
    );

    if (res.success) {
      setSubmittedFiles([
        ...submittedFiles.filter((file, index) => index !== fileIndex),
      ]);
    } else {
      showMessage(res.message, 'failure');
    }
  };

  const handleSubmit = async () => {
    let res;
    if (!isSubmitted) {
      res = await apiHandler(
        'post',
        `posts/${
          userInfoContext?.userInfo?.role === 'student'
            ? userInfoContext.userInfo.batch
            : params.batchId
        }/${params.subjectId}/create`,
        toSendPost
      );
    } else {
      res = await apiHandler(
        'patch',
        `posts/${submittedPost?._id}`,
        toSendPost
      );
    }

    if (res.success) {
      showMessage('Assignment Submitted', 'success');
    } else {
      showMessage(res.message, 'failure');
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        handleYes={handleYesBtn}
        onClose={() => setIsModalOpen(false)}
        title={'Are you sure you want to delete this post?'}
        colorScheme={'failure'}
      />
      <div className='py-4'>
        <div className='flex justify-between items-center pb-4 border-b border-gray-300 dark:border-gray-600'>
          <div className='flex flex-col gap-1'>
            <p className='text-darkColor dark:text-lightColor text-2xl font-semibold'>
              {post?.title}
            </p>
            <div className='flex gap-2 justify-start text-gray-400 dark:text-gray-400 text-xs font-normal'>
              <p>
                {userInfoContext?.userInfo?._id === post?.user._id
                  ? 'You'
                  : post?.user.name}
              </p>
              <p>·</p>
              <p>{moment(post?.createdAt.toString()).format('ll')}</p>
            </div>
          </div>
          {userInfoContext?.userInfo?._id === post?.user._id && (
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
        {post?.category === 'assignment' &&
          post.user._id !== (userInfoContext?.userInfo?._id as string) && (
            <div className='border-t border-gray-300 dark:border-gray-600 py-4 flex flex-col gap-2'>
              <label
                htmlFor='files'
                className='text-gray-400 dark:text-gray-400 text-sm font-semibold'
              >
                Your Work:
              </label>
              {errors.files && (
                <p className='text-xs text-failureColor-dark font-normal'>
                  {errors.files}
                </p>
              )}
              <div
                className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg bg-gray-100 dark:bg-gray-700 ${
                  submittedFiles.length === 0 &&
                  'hover:bg-gray-200  dark:hover:bg-gray-600 dark:hover:border-gray-500'
                } py-6 px-6`}
              >
                {submittedFiles?.length === 0 ? (
                  <div className='flex flex-col items-center justify-center'>
                    <BsFillCloudArrowUpFill className='w-10 h-10 mb-3 text-gray-400' />
                    <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      (PNG, JPG or PDF)
                    </p>
                  </div>
                ) : (
                  <div className='flex gap-4 flex-wrap'>
                    {submittedFiles.map((file, index) => {
                      return (
                        <div
                          key={index}
                          className={`flex flex-col gap-1 justify-center items-center relative px-2 py-2  text-gray-400 dark:text-gray-300 hover:text-gray-200 dark:hover:text-white rounded-lg cursor-pointer hover:bg-failureColor-light`}
                          onClick={() => handleRemoveFile(index)}
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
                <input
                  id='submittedFiles'
                  type='file'
                  className={`${
                    submittedFiles.length === 0
                      ? 'absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer'
                      : 'hidden'
                  }`}
                  multiple
                  accept='image/png, image/jpg, image/jpeg, .pdf'
                  required={submittedFiles.length === 0}
                  onChange={handleFiles}
                />
              </div>
              <div className='self-end'>
                <Button
                  colorScheme='success'
                  isSmall
                  handleClick={handleSubmit}
                  isDisabled={submittedFiles.length === 0}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default PostView;
