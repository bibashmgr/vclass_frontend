import React from 'react'
import { IconType } from 'react-icons'

const IconButton = ({ Icon, title = '', handleClick }: { Icon: IconType, title: string, handleClick: React.MouseEventHandler }) => {
    return (
        <div title={title} onClick={handleClick} className='border border-gray-300 dark:border-gray-500 rounded-md p-[6px] cursor-pointer'>
            {<Icon className='w-5 h-5 text-darkColor dark:text-gray-200' />}
        </div>
    )
}

export default IconButton