import { Navigate, Outlet, Route, Routes } from "react-router-dom";

// pages: auth
import Login from "../pages/auth/Login";
import LoginSuccess from "../pages/auth/LoginSuccess";

// pages: admin
import Dashboard from "../pages/admin/Dashboard";
import Subject from "../pages/admin/subject/Subject";
import SubjectCreate from "../pages/admin/subject/SubjectCreate";
import SubjectEdit from "../pages/admin/subject/SubjectEdit";
import SubjectView from "../pages/admin/subject/SubjectView";
import Faculty from "../pages/admin/faculty/Faculty";
import Batch from "../pages/admin/batch/Batch";
import User from "../pages/admin/user/User";

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

    const getRoute = () => {
        if (role.includes(user.role)) {
            return <Outlet />
        }
        else {
            if (user.role === 'admin') {
                return <Navigate to='/admin' />
            } else if (user.role === 'student' || user.role === 'teacher') {
                return <Navigate to='/' />
            } else {
                if (user.token) {
                    return <Navigate to="/unauthorized" />
                } else {
                    <Navigate to="/auth/login" />
                }
            }
        }
    }

    return (
        <>{getRoute()}</>
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
            <Route element={<AppLayout isAdmin={true} />}>
                <Route path='/' element={<Dashboard />} />
                {/* subjectRoutes */}
                <Route path="/subject" element={<Subject />} />
                <Route path="/subject/create" element={<SubjectCreate />} />
                <Route path="/subject/edit/:id" element={<SubjectEdit />} />
                <Route path="/subject/view/:id" element={<SubjectView />} />
                {/* facultyRoutes */}
                <Route path="/faculty" element={<Faculty />} />
                {/* <Route path="/faculty/create" element={<FacultyCreate />} /> */}
                {/* <Route path="/faculty/edit" element={<FacultyEdit />} /> */}
                {/* <Route path="/faculty/view" element={<FacultyView />} /> */}
                {/* batchRoutes */}
                <Route path="/batch" element={<Batch />} />
                {/* <Route path="/batch/create" element={<BatchCreate />} /> */}
                {/* <Route path="/batch/edit" element={<BatchEdit />} /> */}
                {/* <Route path="/batch/view" element={<BatchView />} /> */}
                {/* userRoutes */}
                <Route path="/user" element={<User />} />
                {/* <Route path="/user/edit" element={<UserEdit />} /> */}
                {/* <Route path="/user/view" element={<UserView />} /> */}
            </Route>
        </Routes>
    )
}

const SubjectRoute = () => {
    return (
        <Routes>

        </Routes>)
}

const SystemRoute = () => {
    return (
        <Routes>
            <Route path='*' element={<PageNotFound />} />
            <Route element={<AppLayout isAdmin={false} />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    )
}