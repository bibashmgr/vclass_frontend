import React, { useState, useEffect, useRef } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

const WebcamComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
    // Check if browser supports media devices
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          // User allowed permission
          setHasPermission(true);
          stream.getTracks().forEach((track) => track.stop());
          // Stop the stream after checking
        })
        .catch(() => {
          // User denied permission or error occurred
          setHasPermission(false);
        });
    }
  }, []);

  const toggleMic = () => {
    setIsMicMuted((prev) => !prev);
  };

  const toggleVideo = () => {
    setIsVideoOn((prev) => !prev);
  };

  useEffect(() => {
    if (hasPermission && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
        })
        .catch(() => {
          // Handle error if necessary
        });
    }
  }, [hasPermission]);

  return (
    <div className="flex h-screen bg-gray-700 items-center w-screen">
      <div className="flex flex-col justify-center w-screen items-center p-8">
        <div className="w-[700px] h-[400px] relative">
          {hasPermission && (
            <video
              ref={videoRef}
              autoPlay
              muted={isMicMuted}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>
        <div className="flex gap-4 mt-[25px] ">
          <button
            onClick={toggleMic}
            className={`rounded-full p-4 ${
              isMicMuted ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isMicMuted ? (
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
            onClick={() => alert("Cancel Meeting Clicked")}
          >
            Cancel Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebcamComponent;
