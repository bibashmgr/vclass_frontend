import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';

// context
import { useUserInfo } from '../../../../context/UserInfoContext';
import { useSocket } from '../../../../context/SocketContext';

// components
import Button from '../../../../components/global/button/Button';
import VideoMainScreen from '../../../../components/system/chat/VideoMainScreen';
import VideoBottomNav from '../../../../components/system/chat/VideoBottomNav';

// schemas
import { callParticipantSchema } from '../../../../utils/schemas';

const VideoCall = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userInfoContext = useUserInfo();
  const socket = useSocket();

  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>();
  const [participants, setParticipants] = useState<callParticipantSchema[]>([]);

  const configuration = {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:global.stun.twilio.com:3478',
        ],
      },
    ],
  };

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

  useEffect(() => {
    if (!location.state) {
      if (isJoined) {
        socket?.off('user-joined');
        socket?.off('new-user-joined');
        socket?.off('user-left');
        socket?.off('user-disconnected');
        socket?.off('incoming-call');
      }
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

  // helper functions:
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

  const makeCall = async (currentUser: string, newUser: string) => {
    const peerConnection = new RTCPeerConnection(configuration);
    const dataChannel = peerConnection.createDataChannel('dataChannel');

    await localStream?.getTracks().forEach((track) => {
      console.log('add track');
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.addEventListener('track', (event) => {
      console.log('listening to tracking');
      let videoElement = document.getElementById(
        `video-${newUser}`
      ) as HTMLVideoElement;
      if (videoElement) {
        videoElement.srcObject = event.streams[0];
        videoElement.muted = false;
      }
    });

    const offer = await peerConnection.createOffer();
    const localDesc = new RTCSessionDescription(offer);
    await peerConnection.setLocalDescription(localDesc);

    socket?.emit('call-user', {
      subjectId: location.state.subjectId,
      batchId: location.state.batchId,
      caller: currentUser,
      callee: newUser,
      offer: offer,
    });

    socket?.once('answer-received', async (data) => {
      const { caller, callee, answer } = data;

      const remoteDesc = new RTCSessionDescription(answer);
      await peerConnection.setRemoteDescription(remoteDesc);
    });

    peerConnection.addEventListener('icecandidate', (event) => {
      if (event.candidate) {
        socket?.emit('send-candidate', {
          subjectId: location.state.subjectId,
          batchId: location.state.batchId,
          sender: currentUser,
          receiver: newUser,
          candidate: event.candidate,
        });
      }
    });

    socket?.on('receive-candidate', async (data) => {
      const { sender, receiver, candidate } = data;
      await peerConnection.addIceCandidate(candidate);
    });
  };

  // handler functions
  const handleJoinBtn = () => {
    setIsJoined(true);

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
      makeCall(userInfoContext?.userInfo?.email!, data.email);
      addSingleParticipant(data);
    });
    socket?.on('new-prefs', (data) => {
      const { email, type } = data;

      updatePrefs(email, type);
    });
    socket?.on('user-left', (data) => {
      removeSingleParticipant(data.userId);
    });
    socket?.on('user-disconnected', (data) => {
      removeSingleParticipant(data.userId);
    });
    socket?.on('incoming-call', async (data) => {
      const { caller, callee, offer } = data;

      const peerConnection = new RTCPeerConnection(configuration);
      peerConnection.ondatachannel = (event) => {
        const remoteDataChannel = event.channel;
      };

      await localStream?.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      peerConnection.addEventListener('track', (event) => {
        let videoElement = document.getElementById(
          `video-${caller}`
        ) as HTMLVideoElement;
        if (videoElement) {
          videoElement.srcObject = event.streams[0];
          videoElement.muted = false;
        }
      });

      const remoteDesc = new RTCSessionDescription(offer);
      await peerConnection.setRemoteDescription(remoteDesc);

      const answer = await peerConnection.createAnswer(offer);
      await peerConnection.setLocalDescription(answer);

      socket.emit('answer-call', {
        subjectId: location.state.subjectId,
        batchId: location.state.batchId,
        caller: caller,
        callee: callee,
        answer: answer,
      });

      peerConnection.addEventListener('icecandidate', (event) => {
        if (event.candidate) {
          socket.emit('send-candidate', {
            subjectId: location.state.subjectId,
            batchId: location.state.batchId,
            sender: callee,
            receiver: caller,
            candidate: event.candidate,
          });
        }
      });

      socket.on('receive-candidate', async (data) => {
        const { sender, receiver, candidate } = data;
        await peerConnection.addIceCandidate(candidate);
      });
    });
  };

  const handleEndBtn = () => {
    if (isJoined) {
      socket?.emit('leave-call', {
        subjectId: location.state.subjectId,
        batchId: location.state.batchId,
        email: userInfoContext?.userInfo?.email,
      });
      socket?.off('user-joined');
      socket?.off('new-user-joined');
      socket?.off('user-left');
      socket?.off('user-disconnected');
    }

    localStream?.getTracks().forEach(function (track) {
      track.stop();
    });

    navigate('/');
  };

  const handleAudioBtn = () => {
    localStream?.getTracks().forEach((track) => {
      if (track.kind === 'audio') {
        track.enabled = !getUserInfoFromList(userInfoContext?.userInfo?.email!)
          ?.prefs.audio;
      }
    });

    socket?.emit('update-prefs', {
      subjectId: location.state.subjectId,
      batchId: location.state.batchId,
      email: userInfoContext?.userInfo?.email,
      type: 'audio',
    });

    updatePrefs(userInfoContext?.userInfo?.email!, 'audio');
  };

  const handleVideoBtn = () => {
    localStream?.getTracks().forEach((track) => {
      if (track.kind === 'video') {
        track.enabled = !getUserInfoFromList(userInfoContext?.userInfo?.email!)
          ?.prefs.video;
      }
    });

    socket?.emit('update-prefs', {
      subjectId: location.state.subjectId,
      batchId: location.state.batchId,
      email: userInfoContext?.userInfo?.email,
      type: 'video',
    });

    updatePrefs(userInfoContext?.userInfo?.email!, 'video');
  };

  const handleScreenBtn = () => {};

  return (
    <div
      className={`w-screen h-screen overflow-hidden bg-gray-100 dark:bg-gray-700 ${
        !isJoined && ' flex flex-col gap-2 items-center justify-center'
      }`}
    >
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
