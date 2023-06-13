import { Route, Routes } from 'react-router-dom';

// pages: auth
import Login from '../../pages/auth/Login';
import LoginSuccess from '../../pages/auth/LoginSuccess';

// pages: public
import PageNotFound from '../../pages/public/PageNotFound';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<PageNotFound />} />
      <Route path='/login' element={<Login />} />
      <Route path='/login/success' element={<LoginSuccess />} />
    </Routes>
  );
};

export default AuthRoutes;
