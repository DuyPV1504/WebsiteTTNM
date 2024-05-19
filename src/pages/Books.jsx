import { MUINavBar } from "../components/MUINavBar";
import React, { createContext, useEffect, useState } from "react";
import "./News.css";
import SpeechReg from "../components/SpeechReg";
import Allbooks from "../components/Allbooks";

function Books() {
  
  const handleAudio = () => {
    if (!speechSynthesis.speaking) {
      let utterance = new SpeechSynthesisUtterance("Welcome to audio books.");
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    handleAudio();
  }, []);

  

  

  return (
    <>
      <MUINavBar />
      <SpeechReg />


      <div className="News">
        <Allbooks />
      </div>
    </>
  );
}

export default Books;
