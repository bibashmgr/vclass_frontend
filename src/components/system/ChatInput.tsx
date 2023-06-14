// icons
import { HiPhotograph } from 'react-icons/hi';
import { HiFaceSmile } from 'react-icons/hi2';

type propsType = {
  text: string;
  handleText: React.ChangeEventHandler<HTMLTextAreaElement>;
  handleSend: React.FormEventHandler;
};

const ChatInput = ({ text, handleText, handleSend }: propsType) => {
  return (
    <form
      className='fixed bottom-4 left-6 md:left-[17rem] lg:left-[20rem] right-6 flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800'
      onSubmit={handleSend}
    >
      <button
        type='button'
        className='inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
        title='Photo'
      >
        <HiPhotograph className='w-6 h-6' />
      </button>
      <button
        type='button'
        className='p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
        title='Emoji'
      >
        <HiFaceSmile className='w-6 h-6' />
      </button>
      <textarea
        rows={1}
        className='block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none'
        placeholder='Your message...'
        required
        value={text}
        name='text'
        onChange={handleText}
      />
      <button
        type='submit'
        className='inline-flex justify-center p-2 text-infoColor-dark rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-600 dark:hover:bg-gray-600'
        title='Send'
      >
        <svg
          aria-hidden='true'
          className='w-6 h-6 rotate-90'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;
