import { Route, Routes } from 'react-router-dom';

// pages: public
import Unauthorized from '../pages/public/Unauthorized';

// routes
import AdminRoutes from './subRoutes/AdminRoutes';
import AuthRoutes from './subRoutes/AuthRoutes';
import SystemRoutes from './subRoutes/SystemRoutes';

// helpers
import { PortalRoutes, ProtectedRoutes } from './RouteHelpers';

import VideoCall from '../pages/system/portal/chat/VideoCall';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PortalRoutes />}>
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/auth/*' element={<AuthRoutes />} />
        <Route element={<ProtectedRoutes roles={['admin']} />}>
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Route>
        <Route element={<ProtectedRoutes roles={['student', 'teacher']} />}>
          <Route path='/*' element={<SystemRoutes />} />
          <Route path='/videocall' element={<VideoCall />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
