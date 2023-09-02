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

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isVideoLinkCreated, setIsVideoCreated] = useState<boolean>(false);

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

    socket?.on('call-just-created', (data) => {
      console.log('call-just-created');
      setIsVideoCreated(true);
    });

    socket?.on('call-already-created', () => {
      console.log('call-already-created');
      setIsVideoCreated(true);
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
      <Outlet context={{ isVideoLinkCreated: isVideoLinkCreated }} />
    </div>
  );
};

export default PortalLayout;
