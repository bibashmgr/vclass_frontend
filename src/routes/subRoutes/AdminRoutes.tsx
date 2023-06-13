import { Route, Routes } from 'react-router-dom';

// pages:admin
import Dashboard from '../../pages/admin/Dashboard';
import Subject from '../../pages/admin/subject/Subject';
import SubjectCreate from '../../pages/admin/subject/SubjectCreate';
import SubjectEdit from '../../pages/admin/subject/SubjectEdit';
import SubjectView from '../../pages/admin/subject/SubjectView';
import Faculty from '../../pages/admin/faculty/Faculty';
import FacultyCreate from '../../pages/admin/faculty/FacultyCreate';
import FacultyEdit from '../../pages/admin/faculty/FacultyEdit';
import FacultyView from '../../pages/admin/faculty/FacultyView';
import Batch from '../../pages/admin/batch/Batch';
import BatchCreate from '../../pages/admin/batch/BatchCreate';
import BatchEdit from '../../pages/admin/batch/BatchEdit';
import BatchView from '../../pages/admin/batch/BatchView';
import User from '../../pages/admin/user/User';
import UserEdit from '../../pages/admin/user/UserEdit';
import UserView from '../../pages/admin/user/UserView';

// pages: public
import PageNotFound from '../../pages/public/PageNotFound';

// layouts
import AppLayout from '../../layouts/AppLayout';

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

export default AdminRoutes;
