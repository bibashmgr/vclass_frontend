// handlers
import { getColorMode } from '../../handlers/storageHandler';

const Home = () => {
  return (
    <div className='flex justify-center items-end h-1/2 w-full'>
      <div className='flex flex-col justify-center items-center gap-2 w-full sm:w-1/3'>
        <img
          src={
            getColorMode() === 'dark'
              ? '/images/select-content-dark.svg'
              : '/images/select-content-light.svg'
          }
          alt='select-something'
          className='w-[150px] h-[150px]'
        />
        <p className='text-gray-400 dark:text-gray-400 text-sm font-semibold text-center'>
          Discover related subjects by selecting the available semesters.
        </p>
      </div>
    </div>
  );
};

export default Home;
