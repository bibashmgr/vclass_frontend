// icons
import { IoMdInformation } from 'react-icons/io';
import { BiCheck } from 'react-icons/bi';
import { TiWarning } from 'react-icons/ti';

export const SuccessIcon = () => {
  return (
    <BiCheck className='w-6 h-6 p-0.5 inline-flex items-center justify-center flex-shrink-0 text-lightColor bg-successColor-dark rounded-md' />
  );
};

export const FailureIcon = () => {
  return (
    <TiWarning className='w-6 h-6 p-0.5 inline-flex items-center justify-center flex-shrink-0 text-lightColor bg-failureColor-dark rounded-md' />
  );
};

export const WarnIcon = () => {
  return (
    <IoMdInformation className='w-6 h-6 p-0.5 inline-flex items-center justify-center flex-shrink-0 text-lightColor bg-warnColor-dark rounded-md' />
  );
};

export const InfoIcon = () => {
  return (
    <IoMdInformation className='w-6 h-6 p-0.5 inline-flex items-center justify-center flex-shrink-0 text-lightColor bg-infoColor-dark rounded-md' />
  );
};
