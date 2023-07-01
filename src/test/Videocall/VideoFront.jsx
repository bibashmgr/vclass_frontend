import React from 'react';
import ParticipantList from './participantslist';

function VideoCall() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Video Call System</h1>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="bg-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-center bg-gray-500 h-64">
            <video className="h-full" id="localVideo" autoPlay muted></video>
            <video className="h-full" id="remoteVideo" autoPlay></video>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Participants</h2>
            <ul className="bg-white border rounded-lg p-4">
              <li className="flex items-center py-1">
                <div className="w-8 h-8 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-gray-800">John Doe</span>
              </li>
              <li className="flex items-center py-1">
                <div className="w-8 h-8 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-gray-800">Jane Smith</span>
              </li>
              <li className="flex items-center py-1">
                <div className="w-8 h-8 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-gray-800">Alex Johnson</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              Start Call
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 py-2 px-6">
        <span className="text-gray-500">Video Call System &copy; 2023</span>
      </footer>
    </div>
  );
}

export default VideoCall;