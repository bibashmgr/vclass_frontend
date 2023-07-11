import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons';

// icons
import { MdClose } from 'react-icons/md';

// schema
import { navLinkSchema } from '../../utils/navLinks';

type propsType = {
  isSidebarOpen: boolean;
  closeSidebar: Function;
  handleSidebar: React.MouseEventHandler;
  pathName: string;
  navLinks: navLinkSchema[];
};

const Sidebar = ({
  isSidebarOpen,
  closeSidebar,
  handleSidebar,
  pathName,
  navLinks,
}: propsType) => {
  return (
    <aside
      className={`bg-white dark:bg-gray-800 w-60 lg:w-72 h-screen px-4 md:px-6 fixed top-0 ${
        isSidebarOpen ? 'left-0 md:left-0' : '-left-60 md:left-0'
      } z-40 ease-linear duration-150`}
    >
      <div className='w-full h-16 md:h-20 flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <img src='/vite.svg' className='w-8 h-8' />
          <p className='text-xl font-bold text-gray-900 dark:text-white'>
            VCLASS
          </p>
        </div>
        <MdClose
          className='block md:hidden w-5 h-5 cursor-pointer text-gray-900 dark:text-white'
          onClick={handleSidebar}
        />
      </div>
      <div className='flex flex-col gap-4 py-4'>
        {navLinks.map((navLink, index) => {
          return (
            <NavLink
              key={index}
              title={navLink.title}
              url={navLink.url}
              Icon={navLink.Icon}
              isActive={
                pathName === navLink.url || pathName === `${navLink.url}/`
              }
              closeSidebar={closeSidebar}
              isSidebarOpen={isSidebarOpen}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;

const NavLink = ({
  title,
  url,
  Icon,
  isActive,
  closeSidebar,
  isSidebarOpen,
}: {
  title: string;
  url: string;
  Icon: IconType;
  isActive: boolean;
  closeSidebar: Function;
  isSidebarOpen: boolean;
}) => {
  const navigate = useNavigate();

  const handleNavLink = (url: string) => {
    navigate(url);
    if (isSidebarOpen) {
      closeSidebar();
    }
  };

  return (
    <div
      className={`capitalize px-4 py-4 rounded-md flex items-center gap-3 cursor-pointer ${
        isActive
          ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
          : 'bg-white text-gray-400 dark:bg-gray-800'
      } `}
      onClick={() => handleNavLink(url)}
    >
      <Icon className='w-5 h-5' />
      <p className='font-semibold text-base'>{title}</p>
    </div>
  );
};
