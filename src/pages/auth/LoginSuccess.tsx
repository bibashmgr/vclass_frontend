import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

// components
import Spinner from '../../components/global/Spinner';

// helpers
import { removeToken, setToken } from '../../handlers/storageHandler';

const LoginSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = location.search;
        const token = new URLSearchParams(query).get('token');

        if (token) {
            setToken(token);
            navigate('/admin');
        } else {
            navigate('/auth/login');
        }
    }, []);

    return (
        <div className='w-screen h-screen bg-gray-100 dark:bg-gray-700 flex justify-center items-center'>
            <div className='flex flex-col gap-2 items-center'>
                <Spinner boxSize={6} />
                <p className='text-darkColor dark:text-gray-300 text-xs font-bold'>Redirecting...</p>
            </div>
        </div>
    )
}

export default LoginSuccess