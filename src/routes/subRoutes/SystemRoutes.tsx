import { Route, Routes } from 'react-router-dom';

// pages: system
import Home from '../../pages/system/Home';
import Semester from '../../pages/system/Semester';
import Batch from '../../pages/system/Batch';
//pages: portal
import Chat from '../../pages/system/portal/chat/Chat';
import Post from '../../pages/system/portal/post/Post';
import PostCreate from '../../pages/system/portal/post/PostCreate';
import PostStats from '../../pages/system/portal/post/PostStats';
import PostView from '../../pages/system/portal/post/PostView';
import PostSingleStats from '../../pages/system/portal/post/PostSingleStats';
import PostEdit from '../../pages/system/portal/post/PostEdit';
import Attendance from '../../pages/system/portal/attendance/Attendance';
import AttendanceMark from '../../pages/system/portal/attendance/AttendanceMark';
import AttendanceView from '../../pages/system/portal/attendance/AttendanceView';

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
          <Route path='attendance' element={<AttendanceView />} />
        </Route>
        <Route path='/batch/:batchId' element={<Batch />} />
        <Route
          path='/batch/:batchId/subject/:subjectId'
          element={<PortalLayout />}
        >
          <Route path='chat' element={<Chat />} />
          <Route path='post' element={<Post />} />
          <Route path='post/create' element={<PostCreate />} />
          <Route path='post/stats' element={<PostStats />} />
          <Route path='post/:postId' element={<PostView />} />
          <Route path='post/:postId/stats' element={<PostSingleStats />} />
          <Route path='post/:postId/edit' element={<PostEdit />} />
          <Route path='attendance' element={<Attendance />} />
          <Route path='attendance/mark' element={<AttendanceMark />} />
          <Route path='attendance/:userId' element={<AttendanceView />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default SystemRoutes;
