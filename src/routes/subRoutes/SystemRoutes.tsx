import { Route, Routes } from 'react-router-dom';

// pages: system
import Home from '../../pages/system/Home';
import Semester from '../../pages/system/Semester';
import Batch from '../../pages/system/Batch';
//pages: portal
import Chat from '../../pages/system/portal/chat/Chat';
import Post from '../../pages/system/portal/post/Post';
import PostCreate from '../../pages/system/portal/post/PostCreate';
import PostEdit from '../../pages/system/portal/post/PostEdit';
import PostView from '../../pages/system/portal/post/PostView';
import Attendance from '../../pages/system/portal/attendance/Attendance';

// pages: public
import PageNotFound from '../../pages/public/PageNotFound';

// layouts
import AppLayout from '../../layouts/AppLayout';
import PortalLayout from '../../layouts/PortalLayout';

const SystemRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<PageNotFound />} />
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='/semester/:semesterId' element={<Semester />} />
        <Route
          path='/semester/:semesterId/subject/:subjectId'
          element={<PortalLayout />}
        >
          <Route path='chat' element={<Chat />} />
          <Route path='post' element={<Post />} />
          <Route path='post/create' element={<PostCreate />} />
          <Route path='post/:postId' element={<PostView />} />
          <Route path='post/:postId/edit' element={<PostEdit />} />
          <Route path='attendance' element={<Attendance />} />
        </Route>
        <Route path='/batch/:batchId' element={<Batch />} />
        <Route
          path='/batch/:batchId/subject/:subjectId'
          element={<PortalLayout />}
        >
          <Route path='chat' element={<Chat />} />
          <Route path='post' element={<Post />} />
          <Route path='post/create' element={<PostCreate />} />
          <Route path='post/:postId' element={<PostView />} />
          <Route path='post/:postId/edit' element={<PostEdit />} />
          <Route path='attendance' element={<Attendance />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default SystemRoutes;
