import { useState, createContext, useContext, ReactNode } from 'react';

// schemas
import { userSchema } from '../utils/schemas';

type userInfoContextType = {
  userInfo: userSchema | null;
  setUserInfo: React.Dispatch<React.SetStateAction<userSchema | null>>;
};

const UserInfoContext = createContext<userInfoContextType | null>(null);

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<userSchema | null>(null);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  return useContext(UserInfoContext);
};
