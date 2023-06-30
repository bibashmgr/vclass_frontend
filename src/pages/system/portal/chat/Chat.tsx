import React, { FormEvent, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

// handlers
import { apiHandler } from '../../../../handlers/apiHandler';
import { showMessage } from '../../../../handlers/messageHandler';

// schemas
import { messageSchema } from '../../../../utils/schemas';

// components
import ChatInput from '../../../../components/system/chat/ChatInput';
import ChatTextBox from '../../../../components/system/chat/ChatTextBox';

// context
import { useUserInfo } from '../../../../context/UserInfoContext';
import { useSocket } from '../../../../context/SocketContext';

const Chat = () => {
  const params = useParams();
  const userInfoContext = useUserInfo();
  const socket = useSocket();

  const [messages, setMessages] = useState<messageSchema[]>([]);
  const [text, setText] = useState<string>('');
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
    const res = await apiHandler('get', `messages/subject/${params.subjectId}`);

    if (res.success) {
      setMessages(res.data);
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
    let day1 = moment(date1).format('Do');
    let day2 = moment(date2).format('Do');

    return day1 !== day2;
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiHandler('post', '/messages/create', {
      desc: text,
      subject: params.subjectId,
    });

    if (res.success) {
      console.log(res.data);
      setMessages([
        ...messages,
        {
          ...res.data,
        },
      ]);
      setText('');
      socket?.emit('send-message', {
        subjectId: params.subjectId,
        userInfo: userInfoContext?.userInfo,
        messageInfo: res.data,
      });
    } else {
      showMessage(res.message, 'failure');
    }
  };

  return (
    <div className='py-4 h-[calc(100vh-200px)]  md:h-[calc(100vh-218px)] overflow-auto'>
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
                  <p className='text-darkColor dark:text-lightColor text-[10px] font-normal border border-gray-300 dark:border-gray-500 rounded-full px-4 py-1.5'>
                    {moment(message.createdAt).format('ll')}
                  </p>
                </div>
              )}
              <ChatTextBox
                message={message}
                isMine={message.user._id === userInfoContext?.userInfo?._id}
                isInfoHide={hideInfo(index)}
              />
            </div>
          );
        })}
      </div>
      <div ref={messagesEndRef} />
      <ChatInput text={text} handleSend={handleSend} handleText={handleText} />
    </div>
  );
};

export default Chat;
