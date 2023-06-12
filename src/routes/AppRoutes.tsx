import { Outlet, Route, Routes, Navigate } from 'react-router-dom';

import { ToastContainer, Theme, Bounce } from 'react-toastify';

// styles
import 'react-toastify/dist/ReactToastify.css';

// pages: auth
import Login from '../pages/auth/Login';
import LoginSuccess from '../pages/auth/LoginSuccess';

// pages: admin
import Dashboard from '../pages/admin/Dashboard';
import Subject from '../pages/admin/subject/Subject';
import SubjectCreate from '../pages/admin/subject/SubjectCreate';
import SubjectEdit from '../pages/admin/subject/SubjectEdit';
import SubjectView from '../pages/admin/subject/SubjectView';
import Faculty from '../pages/admin/faculty/Faculty';
import FacultyCreate from '../pages/admin/faculty/FacultyCreate';
import FacultyEdit from '../pages/admin/faculty/FacultyEdit';
import FacultyView from '../pages/admin/faculty/FacultyView';
import Batch from '../pages/admin/batch/Batch';
import BatchCreate from '../pages/admin/batch/BatchCreate';
import BatchEdit from '../pages/admin/batch/BatchEdit';
import BatchView from '../pages/admin/batch/BatchView';
import User from '../pages/admin/user/User';
import UserEdit from '../pages/admin/user/UserEdit';
import UserView from '../pages/admin/user/UserView';

// pages: system
import Home from '../pages/system/Home';

// pages: public
import PageNotFound from '../pages/public/PageNotFound';
import Unauthorized from '../pages/public/Unauthorized';
import Loader from '../pages/public/Loader';

// layouts
import AppLayout from '../layouts/AppLayout';

// hooks
import { useAuth } from '../hooks/useAuth';

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

const PortalRoutes = ({ colorMode }: { colorMode: string | undefined }) => {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        theme={colorMode as Theme}
      />
      <Outlet />
    </>
  );
};

const ProtectedRoutes = ({ roles }: { roles: string[] }) => {
  const { token, user, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : token && user ? (
        roles.includes(user.role) ? (
          <Outlet />
        ) : (
          <Navigate to='/unauthorized' />
        )
      ) : (
        <Navigate to='/auth/login' />
      )}
    </>
  );
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<PageNotFound />} />
      <Route path='/login' element={<Login />} />
      <Route path='/login/success' element={<LoginSuccess />} />
    </Routes>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<PageNotFound />} />
      <Route element={<AppLayout isAdmin={true} />}>
        <Route path='/' element={<Dashboard />} />
        {/* subjectRoutes */}
        <Route path='/subject' element={<Subject />} />
        <Route path='/subject/create' element={<SubjectCreate />} />
        <Route path='/subject/edit/:subjectId' element={<SubjectEdit />} />
        <Route path='/subject/view/:subjectId' element={<SubjectView />} />
        {/* facultyRoutes */}
        <Route path='/faculty' element={<Faculty />} />
        <Route path='/faculty/create' element={<FacultyCreate />} />
        <Route path='/faculty/edit/:facultyId' element={<FacultyEdit />} />
        <Route path='/faculty/view/:facultyId' element={<FacultyView />} />
        {/* batchRoutes */}
        <Route path='/batch' element={<Batch />} />
        <Route path='/batch/create' element={<BatchCreate />} />
        <Route path='/batch/edit/:batchId' element={<BatchEdit />} />
        <Route path='/batch/view/:batchId' element={<BatchView />} />
        {/* userRoutes */}
        <Route path='/user' element={<User />} />
        <Route path='/user/edit/:userId' element={<UserEdit />} />
        <Route path='/user/view/:userId' element={<UserView />} />
      </Route>
    </Routes>
  );
};

const SystemRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<PageNotFound />} />
      <Route element={<AppLayout isAdmin={false} />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};
