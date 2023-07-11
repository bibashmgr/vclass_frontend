import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// components
import Spinner from '../../components/global/Spinner';

// handlers
import { setToken } from '../../handlers/storageHandler';
import { apiHandler } from '../../handlers/apiHandler';

const LoginSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = location.search;
    const token = new URLSearchParams(query).get('token');

    if (token) {
      fetchUserInfo(token);
    } else {
      navigate('/auth/login');
    }
  }, []);

  const fetchUserInfo = async (jwtToken: string) => {
    const res = await apiHandler(
      'get',
      '/auth/login/success',
      null,
      false,
      jwtToken
    );

    if (res.success) {
      setToken(jwtToken);

      if (res.data.role === 'admin') {
        navigate('/admin');
      } else if (res.data.role === 'student') {
        navigate('/');
      } else if (res.data.role === 'teacher') {
        navigate('/');
      } else {
        navigate('/unauthorized');
      }
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <div className='w-screen h-screen bg-gray-100 dark:bg-gray-700 flex justify-center items-center'>
      <div className='flex flex-col gap-4 items-center'>
        <Spinner boxSize={6} />
        <p className='text-gray-900 dark:text-gray-300 text-sm font-bold'>
          Redirecting
        </p>
      </div>
    </div>
  );
};

export default LoginSuccess;
