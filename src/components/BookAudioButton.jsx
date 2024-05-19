import React, { useState } from "react";
import "./BookAudioButton.css";

const AudioButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div class="audio-button">
      <button onClick={handlePlayPause} id='audioBookButton'>
        {isPlaying ? "Stop" : "Play"}
      </button>
      <audio ref={audioRef} src="src/assets/book/Phù thủy xứ Oz audio.mp4">
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
};

export default AudioButton;