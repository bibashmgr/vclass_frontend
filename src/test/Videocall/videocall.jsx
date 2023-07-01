import React from 'react';
import ParticipantList from './ParticipantList';

function VideoCall() {
  const participants = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alex Johnson' },
  ];

  return (
    <div className="flex flex-col h-screen">
    
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-gray-200 rounded-lg p-6">
        
          <ParticipantList participants={participants} />
         
        </div>
      </main>


    </div>
  );
}

export default VideoCall;
