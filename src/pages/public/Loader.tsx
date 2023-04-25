import React from 'react'

// components
import Spinner from '../../components/global/Spinner'

const Loader = () => {
    return (
        <div className='w-screen h-screen bg-gray-100 dark:bg-gray-700 flex justify-center items-center'>
            <Spinner boxSize={6} />
        </div>
    )
}

export default Loader