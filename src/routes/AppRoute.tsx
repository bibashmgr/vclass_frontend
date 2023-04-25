import { Route, Routes } from "react-router-dom";

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

// layouts
import AppLayout from "../layouts/AppLayout";

const AppRoute = () => {
    return (
        <Routes>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/auth/*" element={<AuthRoute />} />
            <Route path="/*" element={<SystemRoute />} />
            <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
    )
}

export default AppRoute;

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