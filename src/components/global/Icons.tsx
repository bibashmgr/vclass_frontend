// icons
import { IoMdInformation } from 'react-icons/io';
import { BiCheck } from 'react-icons/bi';
import { TiWarning } from 'react-icons/ti';

export const SuccessIcon = () => {
  return (
    <BiCheck className='w-6 h-6 p-0.5 inline-flex items-center justify-center flex-shrink-0 text-white bg-emerald-500 rounded-md' />
  );
};

export const FailureIcon = () => {
  return (
    <TiWarning className='w-6 h-6 p-0.5 inline-flex items-center justify-center flex-shrink-0 text-white bg-red-500 rounded-md' />
  );
};

export const WarnIcon = () => {
  return (
    <IoMdInformation className='w-6 h-6 p-0.5 inline-flex items-center justify-center flex-shrink-0 text-white bg-yellow-300 rounded-md' />
  );
};

export const InfoIcon = () => {
  return (
    <IoMdInformation className='w-6 h-6 p-0.5 inline-flex items-center justify-center flex-shrink-0 text-white bg-blue-500 rounded-md' />
  );
};
