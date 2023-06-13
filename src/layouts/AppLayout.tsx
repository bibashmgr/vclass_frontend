import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// components
import Sidebar from '../components/global/Sidebar';
import Appbar from '../components/global/Appbar';

// utils
import { navLinks } from '../utils/navLinks';

// handlers
import { apiHandler } from '../handlers/apiHandler';

// icons
import { BsFillBookmarksFill } from 'react-icons/bs';

// schemas
import { facultySchema } from '../utils/schemas';

const AppLayout = ({ isAdmin }: { isAdmin: boolean }) => {
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [faculty, setFaculty] = useState<facultySchema>();
  const [semesters, setSemesters] = useState<any[]>([]);

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

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    const res = await apiHandler('get', 'faculties/batch');

    if (res.success) {
      setFaculty(res.data);
      let sems: any[] = [];
      res.data.semesters.map((semester: any, index: number) => {
        sems.push({
          title: `Semester ${index + 1}`,
          url: `/semester/${index + 1}`,
          roles: ['student', 'teacher'],
          Icon: BsFillBookmarksFill,
        });
      });

      setSemesters(sems);
    }
  };

  return (
    <div>
      <Sidebar
        isAdmin={isAdmin}
        isSidebarOpen={isSidebarOpen}
        handleSidebar={handleSidebar}
        closeSidebar={closeSidebar}
        navLinks={isAdmin ? navLinks : semesters}
        pathName={getPathName()}
      />
      <div className='w-screen'>
        {isSidebarOpen && (
          <div
            className='w-screen h-screen fixed top-0 left-0 z-30 bg-black/25'
            onClick={closeSidebar}
          />
        )}
        <Appbar
          pathName={getPathName()}
          handleSidebar={handleSidebar}
          navLinks={isAdmin ? navLinks : semesters}
          isAdmin={isAdmin}
        />
        <div className='w-full md:w-[calc(100vw-240px)] lg:w-[calc(100vw-288px)] fixed top-16 md:top-20 left-0 md:left-60 lg:left-72 overflow-scroll h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] px-4 md:px-6 py-4 md:py-4 bg-gray-100 dark:bg-gray-700 z-10'>
          <Outlet context={{ faculty }} />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
