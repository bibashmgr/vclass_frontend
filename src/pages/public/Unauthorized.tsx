import { useNavigate } from 'react-router-dom';

// components
import Button from '../../components/global/button/Button';

// context
import { useTheme } from '../../context/ThemeContext';
import { useUserInfo } from '../../context/UserInfoContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const themeContext = useTheme();
  const userInfoContext = useUserInfo();

  const redirectUser = () => {
    if (userInfoContext?.userInfo) {
      let role = userInfoContext.userInfo.role;

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'student') {
        navigate('/');
      } else if (role === 'teacher') {
        navigate('/');
      } else {
        navigate('/unauthorized');
      }
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <div className='flex justify-center items-center w-screen h-screen bg-gray-100 dark:bg-gray-700 px-6'>
      <div className='max-w-sm md:bg-white dark:md:bg-gray-800 rounded-lg flex flex-col md:gap-2 justify-center items-center md:py-12 md:px-12'>
        <div className='text-center'>
          <p className='text-gray-900 dark:text-white font-bold text-2xl'>
            Oops!
          </p>
          <p className='text-gray-400 dark:text-gray-300 font-normal text-xs'>
            You mustn't be here.
          </p>
        </div>
        <img
          src={
            themeContext === 'dark'
              ? '/images/unauthorized-dark.svg'
              : '/images/unauthorized-light.svg'
          }
          alt='404'
          className='w-[300px] h-[300px]'
        />
        <Button handleClick={redirectUser} colorScheme='info'>
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
