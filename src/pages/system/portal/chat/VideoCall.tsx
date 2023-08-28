import React, { useState, useEffect } from "react";
import Header from "../../../../components/system/chat/Meet UI/header";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../../../components/system/chat/Meet UI/footer";

const WebcamComponent = () => {
  const history = useNavigate();
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // ... your existing useEffect code ...
  }, []);

  const toggleMic = () => {
    setIsMicOn((prev) => !prev);
  };

  const toggleVideo = () => {
    setIsVideoOn((prev) => !prev);
  };

  const handleJoinMeeting = () => {
    // Redirect to "/blank" page
    setIsJoined(true);
  };

  return (
    <div className="flex h-screen bg-gray-700 r w-screen">
      {!isJoined ? (
        <div className="flex flex-col justify-center w-screen items-center p-8">
          {/* Video container */}
          <div>
            {!isVideoOn ? (
              <div className="w-[400px] h-[300px] bg-black border-1 border-gray-400 rounded-md"></div>
            ) : (
              <video
                id="video"
                className="w-[400px] h-[300px] bg-black border-1"
              />
            )}
          </div>
          {/* Microphone and video toggle buttons */}
          <div className="flex gap-4 mt-[25px] ">
            <button
              onClick={toggleMic}
              className={`rounded-full p-4 ${
                !isMicOn ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {isMicOn ? (
                <FaMicrophoneSlash className="text-white text-2xl" />
              ) : (
                <FaMicrophone className="text-white text-2xl" />
              )}
            </button>
            <button
              onClick={toggleVideo}
              className={`rounded-full p-4 ${
                isVideoOn ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {isVideoOn ? (
                <FaVideo className="text-white text-2xl" />
              ) : (
                <FaVideoSlash className="text-white text-2xl" />
              )}
            </button>
          </div>
          {/* Ready to join text */}
          <div>
            <p className="mt-[10px] text-white">Ready To Join?</p>
          </div>
          {/* Join and cancel buttons */}
          <div className="flex flex-row justify-content-around gap-[10px] mt-[3px]">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleJoinMeeting}
            >
              Join Meeting
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => alert("Cancel Meeting Clicked")}
            >
              Cancel Meeting
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Header></Header>
          <BottomNavigation />
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
