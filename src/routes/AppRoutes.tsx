import { Route, Routes } from 'react-router-dom';

// pages: public
import Unauthorized from '../pages/public/Unauthorized';

// routes
import AdminRoutes from './subRoutes/AdminRoutes';
import AuthRoutes from './subRoutes/AuthRoutes';
import SystemRoutes from './subRoutes/SystemRoutes';

// helpers
import { PortalRoutes, ProtectedRoutes } from './RouteHelpers';

const AppRoutes = ({ colorMode }: { colorMode: string | undefined }) => {
  return (
    <Routes>
      <Route element={<PortalRoutes colorMode={colorMode} />}>
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/auth/*' element={<AuthRoutes />} />
        <Route element={<ProtectedRoutes roles={['admin']} />}>
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Route>
        <Route element={<ProtectedRoutes roles={['student', 'teacher']} />}>
          <Route path='/*' element={<SystemRoutes />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
