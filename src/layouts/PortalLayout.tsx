import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// components
import Tabs from '../components/global/Tabs';

// utils
import { portals } from '../utils/portals';

const PortalLayout = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let locations = location.pathname.split('/');

    portals.map((portal, index) => {
      if (portal.url === locations[locations.length - 1]) {
        setActiveIndex(index);
      }
    });
  }, [location]);

  return (
    <div>
      <Tabs tabs={portals} activeIndex={activeIndex} />
      <Outlet />
    </div>
  );
};

export default PortalLayout;
