import Button from '../../components/global/Button';

const Login = () => {
  const handleLogin = async () => {
    window.open('http://localhost:9999/auth/google', '_self');
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-700'>
      <Button handleClick={handleLogin} colorScheme='info'>
        Login with Goggle
      </Button>
    </div>
  );
};

export default Login;
