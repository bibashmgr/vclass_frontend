import { useEffect, useState } from 'react';

// handlers
import { getToken } from '../handlers/storageHandler';
import { apiHandler } from '../handlers/apiHandler';

// schemas
import { userSchema } from '../utils/schemas';

// context
// import { useUserInfo } from '../context/UserInfoContext';

export const useAuth = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<userSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // const userInfo = useUserInfo();

  const getUser = async () => {
    const res = await apiHandler('get', 'auth/login/success');

    if (res.success) {
      setUser(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const userToken = getToken();

    if (userToken) {
      setToken(userToken);
      getUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  return { token, user, isLoading };
};
