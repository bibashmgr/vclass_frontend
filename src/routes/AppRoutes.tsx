import { Outlet, Route, Routes } from 'react-router-dom';

import { ToastContainer, Theme, Flip } from 'react-toastify';

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

// layouts
import AppLayout from '../layouts/AppLayout';

const AppRoutes = ({ colorMode }: { colorMode: string | undefined }) => {
  return (
    <Routes>
      <Route path='/unauthorized' element={<Unauthorized />} />
      <Route
        element={
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
              transition={Flip}
              theme={colorMode as Theme}
            />
            <Outlet />
          </>
        }
      >
        <Route path='/auth/*' element={<AuthRoutes />} />
        <Route path='/*' element={<SystemRoutes />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

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
        <Route path='/subject/edit/:id' element={<SubjectEdit />} />
        <Route path='/subject/view/:id' element={<SubjectView />} />
        {/* facultyRoutes */}
        <Route path='/faculty' element={<Faculty />} />
        <Route path='/faculty/create' element={<FacultyCreate />} />
        <Route path='/faculty/edit/:id' element={<FacultyEdit />} />
        <Route path='/faculty/view/:id' element={<FacultyView />} />
        {/* batchRoutes */}
        <Route path='/batch' element={<Batch />} />
        <Route path='/batch/create' element={<BatchCreate />} />
        <Route path='/batch/edit/:id' element={<BatchEdit />} />
        <Route path='/batch/view/:id' element={<BatchView />} />
        {/* userRoutes */}
        <Route path='/user' element={<User />} />
        <Route path='/user/edit/:id' element={<UserEdit />} />
        <Route path='/user/view/:id' element={<UserView />} />
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
