import { Route, Routes } from 'react-router-dom';

// pages: system
import Home from '../../pages/system/Home';
import Semester from '../../pages/system/Semester';
import SubjectPortal from '../../pages/system/subjectPortal/SubjectPortal';

// pages: public
import PageNotFound from '../../pages/public/PageNotFound';

// layouts
import AppLayout from '../../layouts/AppLayout';

const SystemRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<PageNotFound />} />
      <Route element={<AppLayout isAdmin={false} />}>
        <Route index element={<Home />} />
        <Route path='/semester/:semesterId' element={<Semester />} />
        <Route
          path='/semester/:semesterId/subject/:subjectId'
          element={<SubjectPortal />}
        />
      </Route>
    </Routes>
  );
};

export default SystemRoutes;
