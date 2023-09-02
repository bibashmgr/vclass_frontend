import React from 'react';

// icons
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { BiVideo, BiVideoOff } from 'react-icons/bi';
import { BsPauseFill } from 'react-icons/bs';
import { TbScreenShare } from 'react-icons/tb';
import { TbPhoneX } from 'react-icons/tb';

// schema
import { callParticipantSchema } from '../../../utils/schemas';

type propsType = {
  isJoined: boolean;
  isAudioOn: boolean;
  isVideoOn: boolean;
  isScreenShared: boolean;
  handleAudioBtn: () => void;
  handleVideoBtn: () => void;
  handleScreenBtn: () => void;
  handleEndBtn: () => void;
};

const VideoBottomNav = ({
  isJoined,
  isAudioOn,
  isVideoOn,
  isScreenShared,
  handleAudioBtn,
  handleVideoBtn,
  handleScreenBtn,
  handleEndBtn,
}: propsType) => {
  return (
    <nav
      className={`
      flex justify-center items-center gap-4
        ${isJoined ? 'h-[10vh] w-screen' : 'h-[60px] w-full'}
      `}
    >
      <div
        className={`w-12 h-12 flex justify-center items-center dark:bg-gray-800 rounded-full cursor-pointer hover:opacity-80 text-white dark:text-white text-xl ${
          !isAudioOn && 'bg-red-500 dark:bg-red-500'
        }`}
        onClick={handleAudioBtn}
      >
        {isAudioOn ? <IoMdMic /> : <IoMdMicOff />}
      </div>
      <div
        className={`w-12 h-12 flex justify-center items-center dark:bg-gray-800 rounded-full cursor-pointer hover:opacity-80 text-white text-xl ${
          !isVideoOn && 'bg-red-500 dark:bg-red-500'
        }`}
        onClick={handleVideoBtn}
        id='video-controller'
      >
        {isVideoOn ? <BiVideo /> : <BiVideoOff />}
      </div>
      {isJoined && (
        <div
          className={`w-12 h-12 flex justify-center items-center dark:bg-gray-800 rounded-full cursor-pointer hover:opacity-80 text-white text-xl ${
            !isScreenShared && 'bg-red-500 dark:bg-red-500'
          }`}
          onClick={handleScreenBtn}
        >
          {isScreenShared ? <BsPauseFill /> : <TbScreenShare />}
        </div>
      )}

      <div
        className='w-12 h-12 flex justify-center items-center rounded-full cursor-pointer hover:opacity-80 text-white text-xl bg-red-500 dark:bg-red-500'
        onClick={handleEndBtn}
      >
        <TbPhoneX />
      </div>
    </nav>
  );
};

export default VideoBottomNav;
