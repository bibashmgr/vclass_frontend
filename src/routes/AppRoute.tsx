import { Route, Routes } from "react-router-dom";

// pages: auth
import Login from "../pages/auth/Login";

export const AppRoute = () => {
    return (
        <Routes>
            <Route path="/*" element={<SystemRoute />} />
            <Route path="/auth/*" element={<AuthRoute />} />
            <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
    )
}

const AuthRoute = () => {
    return (
        <Routes>
            <Route path='*' element={<div>Page Not Found</div>} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

const AdminRoute = () => {
    return (
        <Routes>
            <Route path='*' element={<div>Page Not Found</div>} />
            <Route path='/' element={<div>Dashboard</div>} />
        </Routes>
    )
}

const SystemRoute = () => {
    return (
        <Routes>
            <Route path='*' element={<div>Page Not Found</div>} />
            <Route index element={<div>System Home</div>} />
        </Routes>
    )
}