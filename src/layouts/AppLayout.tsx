import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = ({ isAdmin }: { isAdmin: boolean }) => {
    return (
        <>
            <div>AppLayout</div>
            <Outlet />
        </>
    )
}

export default AppLayout