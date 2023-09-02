import React from 'react';

// schemas
import { callParticipantSchema, userSchema } from '../../../utils/schemas';
import { IoMdMicOff } from 'react-icons/io';

type propsType = {
  isJoined: boolean;
  participants: callParticipantSchema[];
  userInfo: userSchema;
};

const VideoMainScreen = ({ isJoined, participants, userInfo }: propsType) => {
  return (
    <div className={isJoined ? 'w-screen h-[90vh]' : 'w-[360px] h-[300px]'}>
      <div
        className={
          isJoined
            ? `grid ${
                participants.length === 1
                  ? 'md:grid-cols-1'
                  : participants.length <= 4
                  ? 'md:grid-cols-2'
                  : 'md:grid-cols-4'
              } w-full h-full p-4 gap-4 ${
                participants.length <= 4 ? 'grid-cols-1' : 'grid-cols-2'
              } ${
                participants.length <= 4
                  ? `grid-rows-${participants.length}`
                  : `grid-rows-${Math.ceil(participants.length / 2)}`
              }`
            : 'w-full h-full'
        }
      >
        {participants.map((participant, index) => {
          return (
            <ParticipantCard
              key={index}
              isJoined={isJoined}
              userInfo={userInfo}
              participant={participant}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VideoMainScreen;

const ParticipantCard = ({
  participant,
  userInfo,
  isJoined,
}: {
  isJoined: boolean;
  participant: callParticipantSchema;
  userInfo: userSchema;
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-900 w-full h-full rounded-lg relative ${
        isJoined && 'min-h-[200px]'
      }
      `}
    >
      {!participant.prefs.video && (
        <div className='bg-black w-full h-full rounded-lg'>
          <img
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full z-[999]'
            src={participant.avatar}
          />
        </div>
      )}

      <video
        className={`w-full h-full rounded-lg object-cover ${
          !participant.prefs.video ? 'invisible' : 'visible'
        }`}
        id={`video-${participant.email}`}
        autoPlay={true}
        controls={false}
      />

      {!participant.prefs.audio && (
        <IoMdMicOff className='absolute top-3 right-3 text-lg text-red-600' />
      )}

      <div className='absolute bottom-3 left-3 text-xs md:text-sm text-white'>
        {participant.email === userInfo.email ? 'You' : participant.name}
      </div>
    </div>
  );
};
