import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { IconType, } from 'react-icons';

// utils
import { navLinks } from '../../utils/navlinks';

// icons
import { MdClose } from 'react-icons/md';


const Sidebar = ({ isAdmin, isSidebarOpen, handleSidebar, pathName }: { isAdmin: boolean, isSidebarOpen: boolean, handleSidebar: React.MouseEventHandler, pathName: string }) => {

    return (
        <aside className={`bg-lightColor w-60 lg:w-72 h-screen px-4 md:px-6 fixed top-0 ${isSidebarOpen ? 'left-0 md:left-0' : '-left-60 md:left-0'} z-[999] md:ease-linear md:duration-150`}>
            <div className='w-full h-16 md:h-20 flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <img src='/vite.svg' className='w-8 h-8' />
                    <p className='text-xl font-bold text-darkColor'>LOGO</p>
                </div>
                <MdClose className='block md:hidden w-5 h-5 cursor-pointer text-darkColor' onClick={handleSidebar} />
            </div>
            <div className='flex flex-col gap-4 py-4'>
                {
                    navLinks.map((navLink, index) => {
                        return isAdmin && <NavLink key={index} title={navLink.title} url={navLink.url} Icon={navLink.Icon} isActive={pathName === navLink.url} />
                    }
                    )
                }
            </div>
        </aside>
    )
}

export default Sidebar

const NavLink = ({ title, url, Icon, isActive }: { title: string, url: string, Icon: IconType, isActive: boolean }) => {
    return (
        <Link to={url} className={`capitalize px-4 py-4 rounded-md flex items-center gap-3 ${isActive ? 'bg-neutralColor-lightest text-darkColor' : 'bg-lightColor text-neutralColor-dark'} `}>
            <Icon className='w-5 h-5' />
            <p className='font-semibold text-base'>{title}</p>
        </Link>
    )
}