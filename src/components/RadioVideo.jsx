import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./Article.css";
import { useState, useRef } from "react";
function RadioVideo({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const handlePlayAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(video.audioUrl);
    }

    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleAudio = () => {
    let audio = new Audio(video.audioTitle); // replace 'audioUrl' with the actual property
    audio.play();
  };

  const handlePauseAudio = () => {
    // Assuming `audio` is the audio object you want to control
    if (audio) {
      audio.pause();
    }
  };

  return (
    <div className="news_book my-4">
      <Card>
        <CardMedia
          sx={{ height: 300 }}
          image="https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-music-headphones-and-musical-notes-illustration-image_1221799.jpg"
          title="green iguana"
        />
        <CardActions>
          <Typography gutterBottom variant="h5" component="div"></Typography>
          <IconButton
            tabIndex={"1"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
            aria-label="play/pause"
            onClick={handlePlayAudio}
            onFocus={handleAudio}
          >
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
        </CardActions>
        <CardContent className="border-spacing-0">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ color: "#133c8b", fontWeight: "bold" }}
          >
            {video.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.auther}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            align="right"
            className="italic"
          >
            {/* {video.date} */}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default RadioVideo;
