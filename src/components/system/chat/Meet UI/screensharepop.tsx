import React, { useState, useRef } from "react";

const ScreenSharePopup: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleShareScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true, // This will use default constraints for screen capture
        audio: false,
      });
      setStream(stream);
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const handleStopShare = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!stream ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleShareScreen}
        >
          Share Screen
        </button>
      ) : (
        <>
          <video
            className="w-1/2 border border-black mt-4"
            autoPlay
            playsInline
            muted
            ref={videoRef}
          ></video>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleStopShare}
          >
            Stop Sharing
          </button>
        </>
      )}
    </div>
  );
};

export default ScreenSharePopup;
