import { Navigate, Outlet, Route, Routes } from "react-router-dom";

// pages: auth
import Login from "../pages/auth/Login";
import LoginSuccess from "../pages/auth/LoginSuccess";

// pages: admin
import Dashboard from "../pages/admin/Dashboard";

// pages: system
import Home from "../pages/system/Home";

// pages: public
import PageNotFound from "../pages/public/PageNotFound";
import Unauthorized from "../pages/public/Unauthorized";
import Loader from "../pages/public/Loader";

// hooks
import { useAuth } from "../hooks/useAuth";

// layouts
import AppLayout from "../layouts/AppLayout";

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route element={<UnAuthenticatedRoute />}>
                <Route path="/auth/*" element={<AuthRoute />} />
            </Route>
            <Route element={<AuthenticatedRoute />}>
                <Route element={<ProtectedRoute role={['student', 'teacher']} />}>
                    <Route path="/*" element={<SystemRoute />} />
                </Route>
                <Route element={<ProtectedRoute role={['admin']} />}>
                    <Route path="/admin/*" element={<AdminRoute />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoute;

const UnAuthenticatedRoute = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return <Loader />
    }
    return (
        <>{!user ? <Outlet /> : (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to='/' />)}</>
    )
}

const AuthenticatedRoute = () => {
    const { user, loading } = useAuth()

    if (loading) {
        return <Loader />
    }
    return (
        <>{user ? <Outlet /> : <Navigate to="/auth/login" />}</>
    )
}

const ProtectedRoute = ({ role }: { role: string[] }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <Loader />
    }
    return (
        <>{role.includes(user.role) ? <Outlet /> : (user.token ? <Navigate to="/unauthorized" /> : <Navigate to="/auth/login" />)}</>
    )
}

const AuthRoute = () => {
    return (
        <Routes>
            <Route path='*' element={<PageNotFound />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login/success' element={<LoginSuccess />} />
        </Routes>
    )
}

const AdminRoute = () => {
    return (
        <Routes>
            <Route path='*' element={<PageNotFound />} />
            <Route path='/' element={<Dashboard />} />
        </Routes>
    )
}

const SystemRoute = () => {
    return (
        <Routes>
            <Route path='*' element={<PageNotFound />} />
            <Route index element={<Home />} />
        </Routes>
    )
}