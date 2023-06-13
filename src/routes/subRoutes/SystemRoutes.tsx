import { Route, Routes } from 'react-router-dom';

// pages: system
import Home from '../../pages/system/Home';
import Semester from '../../pages/system/Semester';
import Chat from '../../pages/system/portal/Chat';
import Post from '../../pages/system/portal/Post';
import Attendance from '../../pages/system/portal/Attendance';

// pages: public
import PageNotFound from '../../pages/public/PageNotFound';

// layouts
import AppLayout from '../../layouts/AppLayout';
import PortalLayout from '../../layouts/PortalLayout';

const SystemRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<PageNotFound />} />
      <Route element={<AppLayout isAdmin={false} />}>
        <Route index element={<Home />} />
        <Route path='/semester/:semesterId' element={<Semester />} />
        <Route
          path='/semester/:semesterId/subject/:subjectId'
          element={<PortalLayout />}
        >
          <Route path='chat' element={<Chat />} />
          <Route path='post' element={<Post />} />
          <Route path='attendance' element={<Attendance />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default SystemRoutes;
