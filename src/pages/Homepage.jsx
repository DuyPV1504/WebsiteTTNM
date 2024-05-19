import { MUINavBar } from "../components/MUINavBar";

import "../App.css";
import React, { useState } from "react";
import SpeechReg from "../components/SpeechReg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import "./ripple.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useStore } from "react-redux";
function Homepage() {
  const handleAudio = () => {
    if (!speechSynthesis.speaking) {
      let utterance = new SpeechSynthesisUtterance("This is Homepage.");
      utterance.lang = 'en-EN';
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    handleAudio();
  }, []);
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  function navigateToHomepage(e) {
    e.preventDefault()
    navigate("/home-page")
  }
  useEffect(() => {
    if (!localStorage.getItem("faceAuth")) {
      navigate("/login");
    }

    const { account } = JSON.parse(localStorage.getItem("faceAuth"));
    setAccount(account);
  }, []);

  const store = useStore();

  const handleKeyboardPress = (event) => {
    const isShowing = store.getState().player.isShowingSpeech;

    if (event.key === 'Escape' && !isShowing) {
      if (!speechSynthesis.speaking) {
        let utterance = new SpeechSynthesisUtterance("You logged out.");
        utterance.lang = 'en-EN';
        speechSynthesis.speak(utterance);
      }
      localStorage.removeItem("faceAuth");
      navigate("/");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardPress)

    return () => {
      window.removeEventListener("keydown", handleKeyboardPress)
    };
  }, []);

  if (!account) {
    return null;
  }
  console.log(account);
  return (
    <div className="App">
      <MUINavBar />
      <SpeechReg />

      {/* content of homepage */}
      <div className="relative flex">
        <div className="flex ">
          <div className="bg-gray-700 flex-none w-[calc(40vh)] px-6 h-[calc(93vh)] overflow-y-scroll no-scrollbar">
            <div className="flex mt-4 flex-col">
              <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                <div className="ml-10 text-center mb-24 animate-slideup">
                  <img
                    className="mx-auto mb-8 object-cover h-48 w-48 rounded-full"
                    src={
                      account?.type === "CUSTOM"
                        ? account.picture
                        : `/temp-accounts/${account.picture}`
                    }
                    alt={account.fullName}
                  />
                  <h1
                    className="block text-3xl tracking-tight font-extrabold text-gray-900 sm:text-1xl md:text-1xl bg-clip-text text-transparent bg-white"
                    style={{
                      lineHeight: "1.5",
                    }}
                  >
                    {account?.fullName}
                  </h1>
                  <div
                    onClick={() => {
                      localStorage.removeItem("faceAuth");
                      navigate("/");
                    }}
                    className="flex gap-2 mt-12 w-fit mx-auto cursor-pointer z-10 py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-900"
                  >
                    <button className="text-white" >Logout</button>
                    <IoIosLogOut
                      color="white"
                      size={25}
                    />
                  </div>

                </div>
              </div>

            </div>
          </div>
          <div className="flex-auto w-[calc(125vh)] px-6">
            <div className="mt-8 animate-slowfade justify-center items-center text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-900">
              Welcome to Echo
            </div>
            <Grid container spacing={8} className="pl-10 pt-5">
              <Grid item xs={4}>
                <Card className='ripple animate-slideup' sx={{ maxWidth: 333 }}>
                  <CardMedia
                    sx={{ height: 180 }}
                    image="data:image/png;base64,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"
                    title="accessibility"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Accessibility
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Easy to use, easy to navigate, easy to control using keyboard.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className='ripple animate-slideup' sx={{
                  maxWidth: 333
                }}>
                  <CardMedia
                    sx={{ height: 180 }}
                    image="https://media.istockphoto.com/id/1130597585/vector/voice-control-icon.jpg?s=612x612&w=0&k=20&c=vdTaGg2OO5wJyoXulMgYdwLta7Y3hrKhx64JPHFGmcQ="
                    title="vcontrol"

                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      VControl
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Using your voice to control and navigate around the website.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className='ripple animate-slideup' sx={{ maxWidth: 333 }}>
                  <CardMedia
                    sx={{ height: 180 }}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Hig7g_EPHWodiyUPUV91Cr-ncBI4F1EmrppvdLEtUA&s"
                    title="news"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      News
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Read the latest news using audio and text-to-speech.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className='ripple animate-slideup' sx={{ maxWidth: 333 }}>
                  <CardMedia
                    sx={{ height: 180 }}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPyZwkyonQAeOlJPMnCTLEnAxz_mQ26n5DvupFR1JbBQ&s"
                    title="books"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Audio Books
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      A large variety of audio books inside our website's library.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className='ripple animate-slideup' sx={{ maxWidth: 333 }}>
                  <CardMedia
                    sx={{ height: 180 }}
                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Circle-icons-music.svg/1024px-Circle-icons-music.svg.png"
                    title="music"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Music
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      A custom music player which you can search and add music to your playlist.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className='ripple animate-slideup' sx={{ maxWidth: 333 }}>
                  <CardMedia
                    sx={{ height: 180 }}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9vgy-tHyTJAlDvdNiUaxsdHdHpDlf8FuJgqJvvEkM-A&s"
                    title="chatroom"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Chatroom
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Explore our multiple chatroom and meet new people with same interest.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div >
      </div>
    </div>
  );
}

export default Homepage;
