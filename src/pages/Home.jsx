import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "../assets/mp3/EnterTologin.mp3";
import Welcome from "../assets/mp3/Welcome.mp3";
import ParticleBackground from 'react-particle-backgrounds';
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
function Home() {
  const handleAudio = () => {

    if (!speechSynthesis.speaking) {
      let utterance = new SpeechSynthesisUtterance("Welcome to Echo. Press enter to login");
      utterance.lang = 'vn-VN';
      speechSynthesis.speak(utterance);
    }
  }
  useEffect(() => {
    handleAudio();

  }, []);
  const navigate = useNavigate();
  const settings = {
    particle: {
      particleCount: 300,
      color: "#eff6ff",
      maxSize: 4
    },
    velocity: {
      directionAngle: 180,
      directionAngleVariance: 60,
      minSpeed: 0.2,
      maxSpeed: 0.5,
    },
    opacity: {
      minOpacity: 0,
      maxOpacity: 0.4,
      opacityTransitionTime: 10000
    }
  }


  const handleKeyboardPress = (event) => {
    if (event.key === 'Enter') {
      localStorage.removeItem("faceAuth");
      navigate("/user-select");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardPress)

    return () => {
      window.removeEventListener("keydown", handleKeyboardPress)
    };
  }, []);

  return (
    <div className="h-[calc(100vh)] bg-gradient-to-t from-blue-400 to-blue-50">
      <ParticleBackground settings={settings} />
      <div className="content mt-8 bg-blend-normal animate-slowfade justify-center items-center text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-900">
        Welcome to Echo
      </div>
      <Link
        to={"/user-select"}
        className="animate-slideup content1 flex gap-2 mt-12 w-fit mx-auto cursor-pointer z-10 py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-900"
      >
        <IoLogInOutline
          color="white"
          size={35}
        />
        <span className="text-white text-2xl" >Login</span>
      </Link>
    </div>
  );
}

export default Home;
