import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import dayjs from 'dayjs';

// handlers
import { apiHandler } from '../../../../handlers/apiHandler';
import { showMessage } from '../../../../handlers/messageHandler';

// schemas
import { messageSchema } from '../../../../utils/schemas';

// components
import ChatInput from '../../../../components/system/chat/ChatInput';
import ChatTextBox from '../../../../components/system/chat/ChatTextBox';
import Spinner from '../../../../components/global/Spinner';
import IconButton from '../../../../components/global/button/IconButton';

// context
import { useUserInfo } from '../../../../context/UserInfoContext';
import { useSocket } from '../../../../context/SocketContext';

// icons
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoIosVideocam } from 'react-icons/io';

const Chat = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userInfoContext = useUserInfo();
  const socket = useSocket();
  const outletContext: any = useOutletContext();

  const [messages, setMessages] = useState<messageSchema[]>([]);
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket?.on('receive-message', (data) => {
      const { messageInfo } = data;
      setMessages((prev) => [...prev, { ...messageInfo }]);
    });

    return () => {
      socket?.off('receive-message');
    };
  }, []);

  const getMessages = async () => {
    const res = await apiHandler(
      'get',
      `messages/${
        userInfoContext?.userInfo?.role === 'student'
          ? userInfoContext.userInfo.batch
          : params.batchId
      }/${params.subjectId}`
    );

    if (res.success) {
      setMessages(res.data);
      setIsLoading(false);
    } else {
      showMessage(res.message, 'failure');
    }
  };

  const hideInfo = (messageIndex: number) => {
    if (messageIndex !== 0) {
      if (
        messages[messageIndex - 1].user._id === messages[messageIndex].user._id
      ) {
        const date1 = new Date(messages[messageIndex - 1].createdAt);
        const date2 = new Date(messages[messageIndex].createdAt);

        return !isOneHourApart(date1, date2);
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const isOneHourApart = (date1: Date, date2: Date) => {
    let timestamp1 = date1.getTime();
    let timestamp2 = date2.getTime();
    let oneHour = 60 * 60 * 1000;

    let difference = Math.abs(timestamp2 - timestamp1);

    return difference > oneHour;
  };

  const isOneDayApart = (date1: Date, date2: Date) => {
    let day1 = dayjs(date1).format('D');
    let day2 = dayjs(date2).format('D');

    return day1 !== day2;
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiHandler(
      'post',
      `messages/${
        userInfoContext?.userInfo?.role === 'student'
          ? userInfoContext.userInfo.batch
          : params.batchId
      }/${params.subjectId}/create`,
      {
        desc: text,
      }
    );

    if (res.success) {
      setMessages([
        ...messages,
        {
          ...res.data,
        },
      ]);
      setText('');
      socket?.emit('send-message', {
        subjectId: params.subjectId,
        batchId:
          userInfoContext?.userInfo?.role === 'student'
            ? userInfoContext.userInfo.batch
            : params.batchId,
        messageInfo: res.data,
      });
    } else {
      showMessage(res.message, 'failure');
    }
  };

  const handleCreateVideoCall = () => {
    navigate('/videocall', {
      state: {
        subjectId: params.subjectId,
        batchId: params.batchId,
      },
    });
  };

  const handleJoinVideoCall = () => {
    navigate('/videocall', {
      state: {
        subjectId: params.subjectId,
        batchId: userInfoContext?.userInfo?.batch,
      },
    });
  };

  return (
    <div className='py-4'>
      {isLoading ? (
        <div className='flex justify-center pt-4'>
          <Spinner boxSize={5} />
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          <div className='flex justify-end gap-2'>
            {userInfoContext?.userInfo?.role === 'teacher' && (
              <IconButton
                Icon={IoIosVideocam}
                iconSize={5}
                title='Create Video Call'
                handleClick={handleCreateVideoCall}
              />
            )}
            {userInfoContext?.userInfo?.role === 'student' && (
              <IconButton
                Icon={IoIosVideocam}
                iconSize={5}
                title='Join Video Call'
                isDisabled={!outletContext.isVideoLinkCreated}
                handleClick={handleJoinVideoCall}
              />
            )}
            <IconButton
              Icon={BsFillPeopleFill}
              iconSize={5}
              title='View Participants'
              handleClick={() => {
                console.log('View Participants');
              }}
            />
          </div>

          {messages.length === 0 ? (
            <div className='flex justify-center pt-4'>
              <p className='text-gray-400 dark:text-gray-400 text-sm font-medium'>
                No Messages
              </p>
            </div>
          ) : (
            <div className='py-2 h-[calc(100vh-272px)]  md:h-[calc(100vh-288px)] overflow-auto'>
              <div className='flex flex-col'>
                {messages.map((message: messageSchema, index) => {
                  return (
                    <div key={index}>
                      {(index === 0 ||
                        isOneDayApart(
                          new Date(messages[index - 1]?.createdAt),
                          new Date(messages[index]?.createdAt)
                        )) && (
                        <div className='flex justify-center items-center mt-4 mb-2'>
                          <p className='text-gray-900 dark:text-white text-[10px] font-normal border border-gray-300 dark:border-gray-500 rounded-full px-4 py-1.5'>
                            {dayjs(message?.createdAt?.toString()).format(
                              'MMM DD, YYYY'
                            )}
                          </p>
                        </div>
                      )}
                      <ChatTextBox
                        message={message}
                        isMine={
                          message.user._id === userInfoContext?.userInfo?._id
                        }
                        isInfoHide={hideInfo(index)}
                      />
                    </div>
                  );
                })}
              </div>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      )}
      <ChatInput text={text} handleSend={handleSend} handleText={handleText} />
    </div>
  );
};

export default Chat;
