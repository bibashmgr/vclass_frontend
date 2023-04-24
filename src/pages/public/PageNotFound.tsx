import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import CustomButton from '../../components/global/CustomButton';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <p>Oops!</p>
                <p>You are lost.</p>
            </div>
            <img src="/images/404.svg" alt="404" />
            <CustomButton handleClick={() => navigate('/admin')} colorScheme='info'>
                Return Home
            </CustomButton>
        </div>
    )
}

export default PageNotFound