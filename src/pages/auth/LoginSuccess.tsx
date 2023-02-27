import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// helpers
import { setUser, getUser } from '../../helpers/storageHandler';

const LoginSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = location.search;
        const token = new URLSearchParams(query).get('token');

        if (token) {
            let user = setUser(token);
            user.then((data) => {
                if (data.role === 'admin') {
                    navigate('/admin/')
                } else {
                    navigate('/')
                }
            })
        } else {
            navigate('/auth/login');
        }
    }, [])

    return (
        <div>LoginSuccess</div>
    )
}

export default LoginSuccess