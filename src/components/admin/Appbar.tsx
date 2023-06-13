import React from 'react';
import { useNavigate } from 'react-router-dom';

// icons
import { MdNotifications, MdWbSunny, MdDarkMode } from 'react-icons/md';
import { HiMenu } from 'react-icons/hi';

// components
import IconButton from '../global/button/IconButton';

// helpers
import {
  getColorMode,
  removeToken,
  setColorMode,
} from '../../handlers/storageHandler';
import Popover from '../global/Popover';

// types
type propsType = {
  handleSidebar: React.MouseEventHandler;
  pathName: string;
  isAdmin: boolean;
  navLinks: any[];
};

const Appbar = ({ handleSidebar, pathName, isAdmin, navLinks }: propsType) => {
  const navigate = useNavigate();

  const getAppbarTitle = (): string | undefined => {
    let navLink = navLinks.find((link) => link.url === pathName);
    return navLink?.title;
  };

  const handleNotificationClick = () => {};

  const handleModeClick = () => {
    setColorMode();
    window.location.reload();
  };

  const handleLogout = () => {
    removeToken();
    navigate('/auth/login');
  };

  return (
    <nav
      className={`bg-gray-100 dark:bg-gray-700 w-full md:w-[calc(100vw-240px)] lg:w-[calc(100vw-288px)] h-16 md:h-20 flex justify-between items-center px-4 md:px-6 sticky md:fixed top-0 left-0 md:left-60 lg:left-72 z-20`}
    >
      <div className='flex gap-3 h-full items-center'>
        <HiMenu
          className='w-6 h-6 block md:hidden text-darkColor dark:text-lightColor cursor-pointer'
          onClick={handleSidebar}
        />
        <p className='text-lg font-bold text-darkColor dark:text-lightColor capitalize'>
          {getAppbarTitle() || 'Home'}
        </p>
      </div>
      <div className='flex gap-2 items-center'>
        {!isAdmin && (
          <IconButton
            Icon={MdNotifications}
            title='Notification'
            handleClick={handleNotificationClick}
            hasIncidator
            indicatorTitle='0'
          />
        )}
        <IconButton
          Icon={getColorMode() === 'dark' ? MdDarkMode : MdWbSunny}
          title='Notification'
          handleClick={handleModeClick}
        />
        <Popover
          parentElement={
            <img
              src='https://via.placeholder.com/150'
              className='w-8 h-8 rounded-md cursor-pointer object-cover'
            />
          }
        >
          <div
            className='px-4 py-2.5 hover:opacity-75 cursor-pointer'
            onClick={handleLogout}
          >
            Logout
          </div>
        </Popover>
      </div>
    </nav>
  );
};

export default Appbar;
