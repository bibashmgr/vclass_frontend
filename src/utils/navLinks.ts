import { IconType } from 'react-icons';

// icons
import { IoGrid } from 'react-icons/io5';
import { RiBook2Fill } from 'react-icons/ri';
import { FaGraduationCap } from 'react-icons/fa';
import { BsStack, BsPersonFill } from 'react-icons/bs';

export type navLinkSchema = {
  title: string;
  url: string;
  roles: string[];
  Icon: IconType;
};

export const navLinks: navLinkSchema[] = [
  {
    title: 'dashboard',
    url: '/admin',
    roles: ['admin'],
    Icon: IoGrid,
  },
  {
    title: 'subject',
    url: '/admin/subject',
    roles: ['admin'],
    Icon: RiBook2Fill,
  },
  {
    title: 'faculty',
    url: '/admin/faculty',
    roles: ['admin'],
    Icon: FaGraduationCap,
  },
  {
    title: 'batch',
    url: '/admin/batch',
    roles: ['admin'],
    Icon: BsStack,
  },
  {
    title: 'user',
    url: '/admin/user',
    roles: ['admin'],
    Icon: BsPersonFill,
  },
];
