import React, { useState } from "react";
import {
  BiMicrophone,
  BiMicrophoneOff,
  BiVideo,
  BiVideoOff,
  BiPhone,
  BiDesktop,
} from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";

const BottomNavigation: React.FC = () => {
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const toggleMicrophone = () => {
    setIsMicrophoneOn((prev) => !prev);
  };

  const shareScreen = () => {
    console.log("Screen share initated");
  };

  const toggleVideo = () => {
    setIsVideoOn((prev) => !prev);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full border-t border-gray-400 p-4 flex justify-center items-center">
      <div className="flex space-x-4 justify-between gap-7">
        <div
          className={`text-${
            isMicrophoneOn ? "green" : "gray"
          }-600 cursor-pointer transform hover:scale-110 transition-transform`}
          onClick={toggleMicrophone}
        >
          <div
            className={`bg-${
              isMicrophoneOn ? "green" : "gray"
            }-200 rounded-full p-3 border border-gray-300 flex items-center justify-center w-10 h-10`}
          >
            {isMicrophoneOn ? (
              <BiMicrophone size={50} />
            ) : (
              <BiMicrophoneOff size={50} />
            )}
          </div>
        </div>
        <div
          className={`text-${
            isVideoOn ? "green" : "gray"
          }-600 cursor-pointer transform hover:scale-110 transition-transform`}
          onClick={toggleVideo}
        >
          <div
            className={`bg-${
              isVideoOn ? "green" : "gray"
            }-200 rounded-full p-3 border border-gray-300 flex items-center justify-center w-10 h-10`}
          >
            {isVideoOn ? <BiVideo size={20} /> : <BiVideoOff size={20} />}
          </div>
        </div>

        <div className="text-gray-600">
          <div
            className="bg-gray-200 rounded-full p-3 border border-gray-300 flex items-center justify-center w-10 h-10 cursor-pointer transform hover:scale-110 transition-transform"
            onClick={shareScreen}
          >
            <BiDesktop size={20} />
          </div>
        </div>
        <div className="text-gray-600">
          <div className="bg-gray-200 rounded-full p-3 border border-gray-300 flex items-center justify-center w-10 h-10 cursor-pointer transform hover:scale-110 transition-transform">
            <FiMoreVertical size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
