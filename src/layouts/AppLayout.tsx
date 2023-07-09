import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// components
import Sidebar from '../components/global/Sidebar';
import Appbar from '../components/global/Appbar';

// utils
import { navLinks, navLinkSchema } from '../utils/navLinks';

// handlers
import { apiHandler } from '../handlers/apiHandler';

// icons
import { BsFillBookmarksFill } from 'react-icons/bs';

// schemas
import { facultySchema } from '../utils/schemas';

// context
import { useUserInfo } from '../context/UserInfoContext';

const AppLayout = () => {
  const location = useLocation();
  const userInfoContext = useUserInfo();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [faculty, setFaculty] = useState<facultySchema>();
  const [batches, setBatches] = useState<navLinkSchema[]>([]);
  const [semesters, setSemesters] = useState<navLinkSchema[]>([]);

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

  const fetchSemesters = async () => {
    const res = await apiHandler('get', 'batches/userId');

    if (res.success) {
      setFaculty(res.data.faculty);
      let sems: any[] = [];
      res.data.faculty.semesters.map((semester: any, index: number) => {
        if (index < res.data.currentSemester) {
          sems.push({
            title: `Semester ${index + 1}`,
            url: `/semester/${index + 1}`,
            roles: ['student'],
            Icon: BsFillBookmarksFill,
          });
        }
      });

      setSemesters(sems);
    }
  };

  const fetchBatches = async () => {
    const res = await apiHandler('get', 'batches/portal');

    if (res.success) {
      let mappingBatches: any[] = [];
      res.data.map((batch: any, index: number) => {
        mappingBatches.push({
          title: `${batch.faculty.name} ${batch.year}`,
          url: `/batch/${batch._id}`,
          roles: ['teacher'],
          Icon: BsFillBookmarksFill,
        });
      });

      setBatches(mappingBatches);
    }
  };

  const getNavLinks = (): navLinkSchema[] => {
    let role = userInfoContext?.userInfo?.role;
    if (role === 'admin') {
      return navLinks;
    } else if (role === 'student') {
      return semesters;
    } else if (role === 'teacher') {
      return batches;
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (userInfoContext?.userInfo?.role === 'student') {
      fetchSemesters();
    }
    if (userInfoContext?.userInfo?.role === 'teacher') {
      fetchBatches();
    }
  }, []);

  return (
    <div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebar={handleSidebar}
        closeSidebar={closeSidebar}
        navLinks={getNavLinks()}
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
          navLinks={getNavLinks()}
        />
        <div className='w-full md:w-[calc(100vw-240px)] lg:w-[calc(100vw-288px)] fixed top-16 md:top-20 left-0 md:left-60 lg:left-72 overflow-scroll h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] px-4 md:px-6 py-4 md:py-4 bg-gray-100 dark:bg-gray-700 z-10'>
          <Outlet context={{ faculty }} />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
