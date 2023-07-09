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

  const userInfoContext = useUserInfo();
  const socket = useSocket();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let locations = location.pathname.split('/');

    portals.map((portal, index) => {
      if (portal.url === locations[5]) {
        setActiveIndex(index);
      }
    });
  }, [location]);

  useEffect(() => {
    socket?.emit('join-portal', {
      subjectId: params.subjectId,
      batchId:
        userInfoContext?.userInfo?.role === 'student'
          ? userInfoContext.userInfo.batch
          : params.batchId,
    });

    return () => {
      socket?.emit('leave-portal', {
        subjectId: params.subjectId,
        batchId:
          userInfoContext?.userInfo?.role === 'student'
            ? userInfoContext.userInfo.batch
            : params.batchId,
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
