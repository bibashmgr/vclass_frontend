import React from 'react';

function ParticipantList({ participants }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Participants</h2>
      <ul className="bg-white border rounded-lg p-4">
        {participants.map((participant) => (
          <li className="flex items-center py-1" key={participant.id}>
            <div className="w-8 h-8 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-gray-800">{participant.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantList;
