import { useState, useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

// components
import Tabs from '../components/global/Tabs';

// utils
import { portals } from '../utils/portals';

// context
import { useUserInfo } from '../context/UserInfoContext';
import { useSocket } from '../context/SocketContext';

const PortalLayout = () => {
  const location = useLocation();
  const params = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const userInfo = useUserInfo();
  const socket = useSocket();

  useEffect(() => {
    let locations = location.pathname.split('/');

    portals.map((portal, index) => {
      if (portal.url === locations[locations.length - 1]) {
        setActiveIndex(index);
      }
    });
  }, [location]);

  useEffect(() => {
    socket?.emit('join-portal', {
      subjectId: params.subjectId,
      userInfo: userInfo?.userInfo,
    });

    return () => {
      socket?.emit('leave-portal', {
        subjectId: params.subjectId,
        userInfo: userInfo?.userInfo,
      });
    };
  }, []);

  return (
    <div>
      <Tabs tabs={portals} activeIndex={activeIndex} />
      <Outlet />
    </div>
  );
};

export default PortalLayout;
