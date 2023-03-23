import React from 'react';

// icons
import { MdNotifications } from 'react-icons/md';
import { HiMenu } from 'react-icons/hi';

// components
import IconButton from './IconButton';

// hooks
import { useAuth } from '../../hooks/useAuth';

// utils
import { navLinks } from '../../utils/navlinks';

const Appbar = ({ handleSidebar, pathName }: { handleSidebar: React.MouseEventHandler, pathName: string }) => {
    const { user } = useAuth();

    const getAppbarTitle = (): string | undefined => {
        let navLink = navLinks.find((link) => link.url === pathName);
        return navLink?.title;
    }

    return (
        <nav className={`bg-neutralColor-lightest w-full md:w-[calc(100vw-240px)] lg:w-[calc(100vw-288px)] h-16 md:h-20 flex justify-between items-center px-4 md:px-6 sticky md:fixed top-0 left-0 md:left-60 lg:left-72 z-[997]`}>
            <div className='flex gap-3 h-full items-center'>
                <HiMenu className='w-6 h-6 block md:hidden text-darkColor cursor-pointer' onClick={handleSidebar} />
                <p className='text-lg font-bold text-darkColor capitalize'>
                    {getAppbarTitle()}
                </p>
            </div>
            <div className='flex gap-2 items-center'>
                <IconButton Icon={MdNotifications} title='Notification' handleClick={() => { }} />
                <img src={user?.avatar} className='w-8 h-8 rounded-md cursor-pointer' />
            </div>
        </nav>
    )
}

export default Appbar