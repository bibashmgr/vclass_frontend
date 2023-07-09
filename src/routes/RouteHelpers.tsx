import { Outlet, Navigate } from 'react-router-dom';
import { ToastContainer, Theme, Bounce } from 'react-toastify';

// styles
import 'react-toastify/dist/ReactToastify.css';

// pages: public
import Loader from '../pages/public/Loader';

// hooks
import { useAuth } from '../hooks/useAuth';

// context
import { useTheme } from '../context/ThemeContext';
import { SocketProvider } from '../context/SocketContext';

export const PortalRoutes = () => {
  const theme = useTheme();
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
        theme={theme as Theme}
      />
      <Outlet />
    </>
  );
};

export const SocketRoutes = () => {
  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
};

export const ProtectedRoutes = ({ roles }: { roles: string[] }) => {
  const { token, user, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : token && user ? (
        roles.includes(user.role) ? (
          <SocketProvider>
            <Outlet />
          </SocketProvider>
        ) : (
          <Navigate to='/unauthorized' />
        )
      ) : (
        <Navigate to='/auth/login' />
      )}
    </>
  );
};
