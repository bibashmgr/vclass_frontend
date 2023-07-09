import moment from 'moment';

// schemas
import { messageSchema } from '../../../utils/schemas';

type propsType = {
  message: messageSchema;
  isMine: boolean;
  isInfoHide: boolean;
};

const ChatTextBox = ({ message, isMine, isInfoHide }: propsType) => {
  return (
    <div className={`w-full flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex gap-4 items-start w-full lg:w-3/4 xl:w-1/2 ${
          isMine ? 'flex-row-reverse' : 'flex-row'
        } ${isInfoHide ? 'mt-1' : 'mt-4'}`}
      >
        <img
          src={message.user.avatar}
          alt='avatar'
          className={`w-8 h-8 rounded-md ${
            isInfoHide
              ? 'pointer-events-none opacity-0'
              : 'pointer-events-auto opacity-100'
          }`}
        />
        <div
          className={`flex flex-col gap-1 ${
            isMine ? 'items-end' : 'items-start'
          }`}
        >
          {!isInfoHide && (
            <div
              className={`flex gap-6 items-end ${
                isMine ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <p className='text-darkColor dark:text-lightColor text-sm font-medium'>
                {isMine ? 'You' : message.user.name.split(' ')[0]}
              </p>
              <p className='text-gray-400 dark:text-gray-400 text-[10px] font-normal'>
                {moment(message.createdAt.toString()).format('h:mm A')}
              </p>
            </div>
          )}
          <p
            className={`text-darkColor dark:text-lightColor text-sm font-normal px-3 py-2.5 bg-white dark:bg-gray-800 rounded-2xl ${
              isMine ? 'rounded-tr-none' : 'rounded-tl-none'
            }`}
          >
            {message.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatTextBox;
