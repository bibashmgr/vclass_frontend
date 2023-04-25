import React from 'react';
import { useNavigate } from 'react-router-dom';

// components
import CustomButton from '../../components/global/CustomButton';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='flex justify-center items-center w-screen h-screen bg-gray-100 dark:bg-gray-700 px-6'>
            <div className='max-w-sm md:bg-white dark:md:bg-gray-800 rounded-lg flex flex-col md:gap-2 justify-center items-center md:py-12 md:px-12'>
                <div className='text-center'>
                    <p className='text-darkColor dark:text-lightColor font-bold text-2xl'>Oops!</p>
                    <p className='text-gray-400 dark:text-gray-300 font-normal text-xs'>You are lost.</p>
                </div>
                <img src="/images/404.svg" alt="404" className='w-[300px] h-[300px]' />
                <CustomButton handleClick={() => navigate('/admin')} colorScheme='info'>
                    Return Home
                </CustomButton>
            </div>
        </div>
    )
}

export default PageNotFound