import React, { useState, useEffect } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

const WebcamComponent = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  useEffect(() => {
    // Check if browser supports media devices
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: false })
        .then((stream) => {
          let video = document.getElementById("video") as HTMLVideoElement;
          if (video) {
            video.srcObject = stream;
          }
        })
        .catch(() => {});
    }
  }, []);

  const toggleMic = () => {
    setIsMicOn((prev) => !prev);
  };

  const toggleVideo = () => {
    setIsVideoOn((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-700 items-center w-screen">
      <div className="flex flex-col justify-center w-screen items-center p-8">
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
        <div>
          <p className="mt-[10px] text-white">Ready To Join?</p>
        </div>
        <div className="flex flex-row justify-content-around gap-[10px] mt-[3px]">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded "
            onClick={() => alert("Join Meeting Clicked")}
          >
            Join Meeting
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2  rounded  "
            onClick={() => alert("Cancle Meeting Clicked")}
          >
            Cancle Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebcamComponent;
