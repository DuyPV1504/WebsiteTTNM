import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Link, redirect } from "react-router-dom";
import Redirect from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./SpeechReg.css"; // Import the CSS
import { Modal } from "@mui/material";
import { useSelector, useStore, useDispatch } from 'react-redux';
import { setShowSpeech, setListeningSpeech } from "../redux/features/playerSlice";
const SpeechReg = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [showComponent, setShowComponent] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const store = useStore();
  const dispatch = useDispatch();
  
  const commands = [
    {
      command: ["go to *"],
      callback: (redirectPage) => {
        setRedirectUrl(redirectPage);
        SpeechRecognition.stopListening();
        dispatch(setListeningSpeech(false));
        dispatch(setShowSpeech(false));
      },
    },
    {
      command: ["search *"],
      callback: (searchString) => {
        if (window.location.pathname === '/Music') {
          SpeechRecognition.stopListening();
          dispatch(setListeningSpeech(false));
          dispatch(setShowSpeech(false));
          setShowComponent(false);
          resetTranscript();
          localStorage.setItem("searchTerm", searchString);
          document.getElementById('search-field').focus();
        }
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");
  const pages = ["home", "news", "books", "music", "chat room"];
  const urls = {
    "home": "/home-page",
    "news": "/news",
    "books": "/Books",
    "music": "/Music",
    "chat room": "/Chatroom",
  };

  function removeDotAtEnd(sentence) {
    if (sentence.endsWith(".")) {
      return sentence.slice(0, -1);
    }
    return sentence;
  }

  const handleRightClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  const handleKeyboardPress = (event) => {
    const isSearching = store.getState().player.searching;
    const isShowing = store.getState().player.isShowingSpeech;
    const isListening = store.getState().player.isListeningSpeech;

    if (window.location.pathname === '/Music') {
      if (!isSearching) {
        if (event.key === '`' && !isShowing) {
          setShowComponent(true);
          handleAudioOpen();
          dispatch(setShowSpeech(true));
        }
        if (event.key === 'Enter' && isListening) {
          console.log("OK STOP");
          SpeechRecognition.stopListening();
          dispatch(setListeningSpeech(false));
          resetTranscript();
        }
        else if (event.key === 'Enter' && isShowing) {
          SpeechRecognition.startListening({ continuous: true });
          dispatch(setListeningSpeech(true));
        }

      }
    }
    else {
      if (event.key === '`' && !isShowing) {
        setShowComponent(true);
        handleAudioOpen();
        dispatch(setShowSpeech(true));
      }
      if (event.key === 'Enter' && isListening) {
        console.log("OK STOP");
        SpeechRecognition.stopListening();
        dispatch(setListeningSpeech(false));
        resetTranscript();
      }
      else if (event.key === 'Enter' && isShowing) {
        SpeechRecognition.startListening({ continuous: true });
        dispatch(setListeningSpeech(true));
      }


    }
  }
  useEffect(() => {

    window.addEventListener("keydown", handleKeyboardPress)

    return () => {
      window.removeEventListener("keydown", handleKeyboardPress)
    };
  }, []);

  const handleAudioOpen = () => {
    if (!speechSynthesis.speaking) {
      let utterance = new SpeechSynthesisUtterance("Voice Control On");
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };
  const handleAudioClose = () => {
    if (!speechSynthesis.speaking) {
      let utterance = new SpeechSynthesisUtterance("Voice Control Off");
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };
  const handleStartAudio = () => {
    const audio = new Audio(EnterToSpeech);
    audio.play();
  };

  let string = "";
  if (showComponent) {
    string = removeDotAtEnd(redirectUrl.toLowerCase());
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return;
    }

    if (pages.includes(string)) {
      console.log(string);
      setShouldRedirect(true);
    } else {
    }
  }
  const handleSaveClick = () => {
    setShowComponent(false); // Ẩn component khi nút "Save" được nhấn
  };

  return (
    <>
      <Modal
        open={showComponent}
        onClose={() => {
          setShowComponent(false);
          dispatch(setShowSpeech(false));
          dispatch(setListeningSpeech(false));
          SpeechRecognition.stopListening();
          resetTranscript();
          handleAudioClose();
        }}
      >
        <div
          class="block rounded-lg bg-white text-center text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
          <div
            class="border-b-2 border-neutral-100 px-6 py-3 dark:border-white/10">
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
              VControl
            </div>
          </div>
          <div class="p-6">
            <h5 class="mb-2 text-xl font-medium leading-tight ">
              Speech Recognition Content
            </h5>
            <p class="mb-4 text-base ">
              {transcript}
            </p>
          </div>
        </div>
      </Modal>
      {shouldRedirect && navigate(urls[string])}
    </>
  );
};

export default SpeechReg;
