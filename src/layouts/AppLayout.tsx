import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// components
import Sidebar from '../components/global/Sidebar';
import Appbar from '../components/global/Appbar';

const AppLayout = ({ isAdmin }: { isAdmin: boolean }) => {
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const getPathName = (): string => {
    let locations = [];
    locations = location.pathname.split('/');

    if (locations.length > 2) {
      return `/${locations[1]}/${locations[2]}`;
    } else {
      return `/${locations[1]}`;
    }
  };

  return (
    <div>
      <Sidebar
        isAdmin={isAdmin}
        isSidebarOpen={isSidebarOpen}
        handleSidebar={handleSidebar}
        closeSidebar={closeSidebar}
        pathName={getPathName()}
      />
      <div className='w-screen'>
        {isSidebarOpen && (
          <div
            className='w-screen h-screen fixed top-0 left-0 z-30 bg-black/25'
            onClick={closeSidebar}
          />
        )}
        <Appbar pathName={getPathName()} handleSidebar={handleSidebar} />
        <div className='w-full md:w-[calc(100vw-240px)] lg:w-[calc(100vw-288px)] fixed top-16 md:top-20 left-0 md:left-60 lg:left-72 overflow-scroll h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] px-4 md:px-6 py-4 md:py-4 bg-gray-100 dark:bg-gray-700 z-10'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
