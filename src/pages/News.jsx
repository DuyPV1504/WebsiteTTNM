import { MUINavBar } from "../components/MUINavBar";
import React, { createContext, useEffect, useState } from "react";
import Newspaper from "../components/Newspaper";
import Container from "@mui/material/Container";
import "./News.css";
import SpeechReg from "../components/SpeechReg";
function News() {
  const handleAudio = () => {
    if (!speechSynthesis.speaking) {
      let utterance = new SpeechSynthesisUtterance("Welcome to news page");
      utterance.lang = 'vn-VN';
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

      <Container
        maxWidth="full"
        maxHeight="full"
        style={{ backgroundColor: "#f6f6f6" }}
      >
        <div className="News">
          <Newspaper />
        </div>
      </Container>
    </>
  );
}

export default News;
