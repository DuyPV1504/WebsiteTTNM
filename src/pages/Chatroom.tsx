import { useEffect, useState } from 'react';
import {
  Call,
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
  CallPreview,
} from '@stream-io/video-react-sdk';
import SpeechReg from '../components/SpeechReg';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setCurRoomIdx, setInCall, setCamera, setMicrophone } from '../redux/features/playerSlice';

import { MdCameraIndoor } from "react-icons/md";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import './Videocall.css';
import { MUINavBar } from '../components/MUINavBar';
import { useNavigate } from 'react-router-dom';
const apiKey = 'p2bba7c6cjwy'; // the API key can be found in the "Credentials" section



// initialize the StreamVideoClient

const RoomCard = ({ curRoom, room, setCurIdx, i }) => {
  return (
    <>
      <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
        <div className="relative w-full h-56 group">
          <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${(curRoom?.callId === room?.callId) ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
            <MdCameraIndoor
              size={35}
              className="text-gray-300"
              onClick={() => { setCurIdx(i) }}
            />
          </div>
          <img alt="room_img" src="https://th.bing.com/th/id/OIP.kYvpI2Zgz75nr83MVFIa5AHaHa?w=626&h=626&rs=1&pid=ImgDetMain" className="w-full h-full rounded-lg" />
        </div>
        <div className="mt-4 flex flex-col">
          <p className="font-semibold text-lg text-white truncate">
            {room?.name}
          </p>
        </div>
      </div>
    </>
  );
}

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export default function Chatroom() {
  const [call, setCall] = useState<Call>();
  const [curIdx, setCurIdx] = useState(0);
  const dispatch = useDispatch();
  const { curRoomIdx, inCall } = useSelector((state) => state.player);
  const store = useStore();
  const navigate = useNavigate();
  let client = null;
  useEffect(() => {
    if (!localStorage.getItem("faceAuth")) {
      navigate("/login");
    }

  }, []);
  const { account } = JSON.parse(localStorage.getItem("faceAuth"));
  let user = {
    id: guidGenerator(),
    name: account.fullName,
    image: account?.type === "CUSTOM"
      ? account.picture
      : `/temp-accounts/${account.picture}`,
    type: 'guest'
  };
  client = new StreamVideoClient({ apiKey, user });
  if (client === null) {
    return null;
  }
  const handleAudio = () => {
    if (!speechSynthesis.speaking) {
      let utterance = new SpeechSynthesisUtterance("Welcome to chat room");
      utterance.lang = 'vn-VN';
      speechSynthesis.speak(utterance);
    }
  }

  useEffect(() => {
    handleAudio();
  }, []);

  const data = [
    {
      callId: "default_a93f7a1b-db32-4b57-9e1b-c73fe837c4d5",
      name: "Chatting",
    },
    {
      callId: "default_a4306235-328e-4013-bfaf-7842bfaf706f",
      name: "Gaming",
    },
    {
      callId: "default_41b49b25-d705-44e5-9d12-01f59c07b172",
      name: "For fun",
    },
    {
      callId: "default_19c79ae7-2c0f-432d-9c61-46728d820e57",
      name: "Make friends",
    },
    {
      callId: "default_59bd33dd-a25c-450a-b978-5d9f15347b06",
      name: "Discussion",
    },
    {
      callId: "default_8015b31c-3e25-4c13-bcbb-2accc002869a",
      name: "Sharing",
    },
  ];

  let said = false;

  useEffect(() => {
    setCurIdx(curRoomIdx);
  }, [curRoomIdx]);
  useEffect(() => {
    const myCall = client.call('default', data[curIdx].callId);
    const val = true;
    dispatch(setCamera({ val }));
    dispatch(setMicrophone({ val }));
    const valIdx = curIdx;
    dispatch(setCurRoomIdx({ valIdx }));
    setCall(myCall);

    if (!said) {
      let utterance = new SpeechSynthesisUtterance("This is room " + data[curIdx].name + ". Press Enter to enter the room");
      utterance.lang = 'vn-VN';
      speechSynthesis.speak(utterance);
    }

    said = true;
    return () => {
      setCall(undefined);
      const val = false;
      dispatch(setInCall({ val }));
      myCall.leave().catch((err) => {
        console.error(`Failed to leave the call`, err);
      });
    };
  }, [curIdx]);

  useEffect(() => {
    if (call !== undefined) {
      if (!inCall) {
        setCall(undefined);
        call.leave().catch((err) => {
          console.error(`Failed to leave the call`, err);
        });
        const myCall = client.call('default', data[curIdx].callId);
        const val = true;
        dispatch(setCamera({ val }));
        dispatch(setMicrophone({ val }));
        setCall(myCall);
      }
      else {
        call.join({ create: true }).catch((err) => {
          console.error(`Failed to join the call`, err);
        });
      }
    }
  }, [inCall]);

  const handleKeyboardPress = (event) => {
    const isInCall = store.getState().player.inCall;
    const roomIdx = store.getState().player.curRoomIdx;

    if (store.getState().player.isShowingSpeech) {
      return;
    }
    if (event.key === 'm' || event.key === 'M') {
      const oldVal = store.getState().player.microphoneState;
      const val = !oldVal;
      dispatch(setMicrophone({ val }));
      if (val) {
        let utterance = new SpeechSynthesisUtterance("Your microphone is on");
        utterance.lang = 'vn-VN';
        speechSynthesis.speak(utterance);
      }
      else {
        let utterance = new SpeechSynthesisUtterance("Your microphone is off");
        utterance.lang = 'vn-VN';
        speechSynthesis.speak(utterance);
      }
    }
    else if (event.key === 'c' || event.key === 'C') {
      const oldVal = store.getState().player.cameraState;
      const val = !oldVal;
      dispatch(setCamera({ val }));
      if (val) {
        let utterance = new SpeechSynthesisUtterance("Your camera is on");
        utterance.lang = 'vn-VN';
        speechSynthesis.speak(utterance);
      }
      else {
        let utterance = new SpeechSynthesisUtterance("Your camera is off");
        utterance.lang = 'vn-VN';
        speechSynthesis.speak(utterance);
      }
    }
    else if (event.key === 'Escape' && isInCall) {
      const val = false;
      dispatch(setInCall({ val }));
      let utterance = new SpeechSynthesisUtterance("You left the room");
      utterance.lang = 'vn-VN';
      speechSynthesis.speak(utterance);

    }
    else if (event.key === 'Enter' && !isInCall) {
      const val = true;
      dispatch(setInCall({ val }));
      let utterance = new SpeechSynthesisUtterance("Joining");
      utterance.lang = 'vn-VN';
      speechSynthesis.speak(utterance);
    }
    else if (event.key === 'ArrowRight' && !isInCall) {
      const valIdx = (roomIdx + 1) % data.length;
      dispatch(setCurRoomIdx({ valIdx }));
    }
    else if (event.key === 'ArrowLeft' && !isInCall) {
      let valIdx = 0;
      if (roomIdx === 0) {
        valIdx = data.length - 1;
      }
      else {
        valIdx = roomIdx - 1;
      }
      dispatch(setCurRoomIdx({ valIdx }));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardPress)
    return () => {
      window.removeEventListener("keydown", handleKeyboardPress) // this event listener is removed after the new route loads
    }
  }, []);

  return (
    <>
      <MUINavBar />
      <SpeechReg />
      <div className="bColor relative flex">
        <div className="flex ">
          <div className="flex-none w-[calc(40vh)] px-6 h-[calc(92vh-72px)] overflow-y-scroll no-scrollbar">
            <div className="flex mt-4 flex-col">
              <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((room, i) => (
                  <RoomCard
                    curRoom={data[curIdx]}
                    room={room}
                    key={i}
                    setCurIdx={setCurIdx}
                    i={i}
                  />
                ))}
              </div>

            </div>
          </div>
          <div className="flex-auto w-[calc(125vh)] px-6">
            <StreamVideo client={client}>
              {call !== undefined ?
                <StreamCall call={call}>
                  <UILayout />
                </StreamCall>
                :
                <>
                </>
              }
            </StreamVideo>
          </div>
        </div >
      </div>
    </>
  );
}

export const UILayout = () => {
  const { useMicrophoneState, useCameraState, useCallCallingState } = useCallStateHooks();
  const { camera } = useCameraState();
  const { microphone } = useMicrophoneState();
  const callingState = useCallCallingState();

  const { isInCall, cameraState, microphoneState } = useSelector((state) => state.player);

  useEffect(() => {
    (async () => {
      if (cameraState === true) {

        await camera.enable();
      }
      else {
        await camera.disable();
      }

    })();
  }, [cameraState]);


  useEffect(() => {
    (async () => {
      if (microphoneState === true) {
        await microphone.enable();
      }
      else {
        await microphone.disable();
      }

    })();
  }, [microphoneState]);
  const handleAudio = () => {
    if (!speechSynthesis.speaking && callingState === CallingState.JOINED) {
      let utterance = new SpeechSynthesisUtterance("You are in the room");
      utterance.lang = 'vn-VN';
      speechSynthesis.speak(utterance);
    }
  }

  useEffect(() => {
    handleAudio();
  });

  if (callingState === CallingState.LEFT) {
    return <div>Left...</div>;
  }
  else if (callingState === CallingState.IDLE) {
    return (
      <>
        <div className="flex justify-center items-center text-center">
          <h2 className="font-bold text-3xl text-white text-left mt-10 mb-10">Press enter to join...</h2>
        </div>
      </>
    );
  }

  if (callingState !== CallingState.JOINED) {
    return (
      <>
        <div className="flex justify-center items-center text-center">
          <ReactLoading type={"bars"} color={"green"} height={200} width={200} />
        </div>
      </>
    );
  }


  return (
    <>

      <StreamTheme>
        <SpeakerLayout participantsBarPosition="bottom" />
        <CallControls />
      </StreamTheme>
    </>
  );
};