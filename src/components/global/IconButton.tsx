import React from 'react'
import { IconType } from 'react-icons'

const IconButton = ({ Icon, handleClick }: { Icon: IconType, handleClick: React.MouseEventHandler }) => {
    return (
        <div onClick={handleClick} className='border border-neutralColor-light rounded-md p-[6px] cursor-pointer'>
            {<Icon className='w-5 h-5' />}
        </div>
    )
}

export default IconButton