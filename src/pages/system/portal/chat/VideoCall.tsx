import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';

// context
import { useUserInfo } from '../../../../context/UserInfoContext';
import { useSocket } from '../../../../context/SocketContext';

// components
import Button from '../../../../components/global/button/Button';
import VideoTopNav from '../../../../components/system/chat/VideoTopNav';
import VideoMainScreen from '../../../../components/system/chat/VideoMainScreen';
import VideoBottomNav from '../../../../components/system/chat/VideoBottomNav';

// schemas
import { callParticipantSchema } from '../../../../utils/schemas';

const VideoCall = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfoContext = useUserInfo();
  const socket = useSocket();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>();

  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [participants, setParticipants] = useState<callParticipantSchema[]>([]);

  useEffect(() => {
    console.log(location.state);

    if (!location.state) {
      navigate('/');
    } else {
      if (navigator && navigator.mediaDevices) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            let videoElement = document.getElementById(
              `video-${userInfoContext?.userInfo?.email!}`
            ) as HTMLVideoElement;
            if (videoElement) {
              videoElement.srcObject = stream;
              videoElement.muted = true;
            }
            setLocalStream(stream);
          })
          .catch((error) => {
            console.error('Error accessing media devices.', error);
          });
      }
    }
  }, []);

  useEffect(() => {
    setParticipants((prev) => [
      ...prev,
      {
        name: userInfoContext?.userInfo?.name!,
        email: userInfoContext?.userInfo?.email!,
        avatar: userInfoContext?.userInfo?.avatar!,
        role: userInfoContext?.userInfo?.role!,
        prefs: {
          audio: false,
          video: false,
          screen: false,
        },
      },
    ]);
  }, []);

  // helpers
  const addSingleParticipant = (participantInfo: callParticipantSchema) => {
    setParticipants((prev) => [...prev, participantInfo]);
  };

  const addParticipantsToList = (participantList: callParticipantSchema[]) => {
    setParticipants((prev) => [...prev, ...participantList]);
  };

  const removeSingleParticipant = (userEmail: string) => {
    let newParticipants = participants.filter(
      (participant) => participant.email !== userEmail
    );
    setParticipants(newParticipants);
  };

  const clearParticipantList = () => {
    setParticipants([]);
  };

  const updatePrefs = (
    userEmail: string,
    prefsType: 'audio' | 'video' | 'screen'
  ) => {
    setParticipants((prev) =>
      prev.filter((participant: callParticipantSchema) => {
        if (participant.email === userEmail) {
          participant.prefs[prefsType] = !participant.prefs[prefsType];
        }

        return participant;
      })
    );
  };

  const getUserInfoFromList = (userEmail: string) => {
    let user = participants.find(
      (participant) => participant.email === userEmail
    );

    return user;
  };

  // handlers
  const handleJoinBtn = () => {
    socket?.emit('join-call', {
      subjectId: location.state.subjectId,
      batchId: location.state.batchId,
      callParticipantInfo: getUserInfoFromList(
        userInfoContext?.userInfo?.email!
      ),
    });

    socket?.on('user-joined', (data) => {
      addParticipantsToList(data);
    });
    socket?.on('new-user-joined', (data) => {
      addSingleParticipant(data);
    });
    socket?.on('user-left', (data) => {
      removeSingleParticipant(data.userId);
    });
    socket?.on('user-disconnected', (data) => {
      removeSingleParticipant(data.userId);
    });

    setIsJoined(true);
  };

  const handleEndBtn = () => {
    // TODO: stop stream
    if (isJoined) {
      socket?.emit('leave-room', {
        subjectId: location.state.subjectId,
        batchId: location.state.batchId,
        email: userInfoContext?.userInfo?.email,
      });
      socket?.off('user-joined');
      socket?.off('new-user-joined');
      socket?.off('user-left');
      socket?.off('user-disconnected');
    }

    navigate('/');
  };

  const handleAudioBtn = () => {
    updatePrefs(userInfoContext?.userInfo?.email!, 'audio');
  };

  const handleVideoBtn = () => {
    updatePrefs(userInfoContext?.userInfo?.email!, 'video');
  };

  const handleScreenBtn = () => {};

  return (
    <div
      className={`w-screen h-screen overflow-hidden bg-gray-100 dark:bg-gray-700 ${
        !isJoined && ' flex flex-col gap-2 items-center justify-center'
      }`}
    >
      {/* {isJoined && <VideoTopNav />} */}
      <VideoMainScreen
        isJoined={isJoined}
        userInfo={userInfoContext?.userInfo!}
        participants={participants}
      />
      <VideoBottomNav
        isJoined={isJoined}
        isAudioOn={
          getUserInfoFromList(userInfoContext?.userInfo?.email!)?.prefs?.audio!
        }
        isVideoOn={
          getUserInfoFromList(userInfoContext?.userInfo?.email!)?.prefs?.video!
        }
        isScreenShared={
          getUserInfoFromList(userInfoContext?.userInfo?.email!)?.prefs?.screen!
        }
        handleEndBtn={handleEndBtn}
        handleAudioBtn={handleAudioBtn}
        handleVideoBtn={handleVideoBtn}
        handleScreenBtn={handleScreenBtn}
      />
      {!isJoined && (
        <div>
          <div className='flex justify-center items-center gap-4 w-[360px] mt-4'>
            <Button colorScheme='info' handleClick={handleJoinBtn}>
              {userInfoContext?.userInfo?.role === 'teacher'
                ? 'Start Video Call'
                : 'Join Video Call'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
