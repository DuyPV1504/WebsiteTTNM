import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';

import { setHeartMode, addPlaylist, removePlaylist, playPause1, setShuffleMode, setReplayMode, nextSong, prevSong, playPause, setNewList1 } from '../../redux/features/playerSlice';
import Controls from './Control';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';


function toSeconds(millis) {
    var seconds = Math.floor(millis / 1000);
    return seconds;
}

const MusicPlayer = () => {
    const { activeSong, currentSongs, currentIndex, curPlaylistIdx, isActive, isPlaying } = useSelector((state) => state.player);
    const [duration, setDuration] = useState(0);
    const [seekTime, setSeekTime] = useState(0);
    const [appTime, setAppTime] = useState(0);
    const [volume, setVolume] = useState(0.3);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [heart, setHeart] = useState(false);
    const dispatch = useDispatch();
    const store = useStore();

    useEffect(() => {
        const val = false;
        dispatch(setHeartMode({ val }));
    }, []);
    useEffect(() => {
        if (currentSongs.length) dispatch(playPause1(true));
    }, [currentIndex, curPlaylistIdx]);

    useEffect(() => {
        const playlistSong = store.getState().player.playlist;
        let idx = -1;
        for (let i = 0; i < playlistSong.length; ++i) {
            if (playlistSong[i].attributes.name === activeSong.attributes.name &&
                playlistSong[i].attributes.artistName === activeSong.attributes.artistName) {
                idx = i;
                break;
            }
        }
        if (idx >= 0) {
            const val = true;
            dispatch(setHeartMode({ val }));
            setHeart(true);
        }
        else {
            const val = false;
            dispatch(setHeartMode({ val }));
            setHeart(false);
        }
    }, [activeSong?.attributes.name, activeSong?.attributes.artistName]);

    useEffect(() => {
        const val = repeat;
        dispatch(setReplayMode({ val }));
    }, [repeat]);

    useEffect(() => {
        const val = shuffle;
        dispatch(setShuffleMode({ val }));
    }, [shuffle]);

    const handlePlayPause = () => {
        if (!isActive) return;

        if (isPlaying) {
            dispatch(playPause(false));
        } else {
            dispatch(playPause(true));
        }
    };

    const handleSetHeart = () => {
        if (!isActive) return;
        if (!heart) {
            dispatch(addPlaylist({}));
        }
        else {
            dispatch(removePlaylist({}));
        }
        const val = !heart;
        dispatch(setHeartMode({ val }));
        setHeart((heart) => !heart);
    };

    const handleNextSong = () => {
        dispatch(playPause(false));

        if (!shuffle) {
            dispatch(nextSong((currentIndex + 1) % currentSongs.length));
        } else {
            dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
        }
    };

    const handlePrevSong = () => {
        if (currentIndex === 0) {
            dispatch(prevSong(currentSongs.length - 1));
        } else if (shuffle) {
            dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
        } else {
            dispatch(prevSong(currentIndex - 1));
        }
    };

    const handleKeyboardPress = (event) => {
        const currentSongs1 = store.getState().player.currentSongs;
        const currentIndex1 = store.getState().player.currentIndex;
        const isActive1 = store.getState().player.isActive;
        const isPlaying1 = store.getState().player.isPlaying;
        const isSearching = store.getState().player.searching;
        const newList = store.getState().player.newList;
        const newList1 = store.getState().player.newList1;
        const replayMode = store.getState().player.replayMode;
        const shuffleMode = store.getState().player.shuffleMode;
        const heartMode = store.getState().player.heart;
        const isShowing = store.getState().player.isShowingSpeech;
        if (isSearching) {
            return;
        }
        if (!newList && event.key === 'ArrowRight') {
            if (newList1) {
                const val = false;
                dispatch(setNewList1({ val }));
                return;
            }
            dispatch(playPause(false));

            if (!shuffleMode) {
                dispatch(nextSong((currentIndex1 + 1) % currentSongs1.length));
            } else {
                dispatch(nextSong(Math.floor(Math.random() * currentSongs1.length)));
            }
        }
        else if (!newList && event.key === 'ArrowLeft') {
            if (currentIndex1 === 0) {
                dispatch(prevSong(currentSongs1.length - 1));
            } else if (shuffleMode) {
                dispatch(prevSong(Math.floor(Math.random() * currentSongs1.length)));
            } else {
                dispatch(prevSong(currentIndex1 - 1));
            }
        }
        else if (event.key === 'Enter') {
            if (!isActive1 || isShowing) return;

            if (isPlaying1) {
                dispatch(playPause(false));
            } else {
                dispatch(playPause(true));
            }
        }
        else if (event.key === 'r' || event.key === 'R') {
            let utterance = new SpeechSynthesisUtterance("Replay is " + ((replayMode) ? "off" : "on"));
            utterance.lang = 'vn-VN';
            speechSynthesis.speak(utterance);
            setRepeat((repeat) => !repeat);
        }
        else if (event.key === 's' || event.key === 'S') {
            let utterance = new SpeechSynthesisUtterance("Shuffle is " + ((shuffleMode) ? "off" : "on"));
            utterance.lang = 'vn-VN';
            speechSynthesis.speak(utterance);
            setShuffle((shuffle) => !shuffle);
        }
        else if (event.key === 'l' || event.key === 'L') {
            if (!isActive) return;
            if (!heartMode) {
                dispatch(addPlaylist({}));
                let utterance = new SpeechSynthesisUtterance("Added to playlist");
                utterance.lang = 'vn-VN';
                speechSynthesis.speak(utterance);
            }
            else {
                dispatch(removePlaylist({}));
                let utterance = new SpeechSynthesisUtterance("Removed from playlist");
                utterance.lang = 'vn-VN';
                speechSynthesis.speak(utterance);
            }
            const val = !heartMode;
            dispatch(setHeartMode({ val }));
            setHeart((heart) => !heart);
        }
        else if (event.key === 'ArrowUp') {
            setVolume((volume) => (Math.min(volume + 0.05, 1)));
        }
        else if (event.key === 'ArrowDown') {
            setVolume((volume) => (Math.max(volume - 0.05, 0)));
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyboardPress)
        return () => {
            window.removeEventListener("keydown", handleKeyboardPress) // this event listener is removed after the new route loads
        }
    }, []);
    return (
        <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
            <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
            <div className="flex-1 flex flex-col items-center justify-center">
                <Controls
                    isPlaying={isPlaying}
                    isActive={isActive}
                    heart={heart}
                    handleSetHeart={handleSetHeart}
                    repeat={repeat}
                    setRepeat={setRepeat}
                    shuffle={shuffle}
                    setShuffle={setShuffle}
                    currentSongs={currentSongs}
                    handlePlayPause={handlePlayPause}
                    handlePrevSong={handlePrevSong}
                    handleNextSong={handleNextSong}
                />
                <Seekbar
                    value={appTime}
                    min="0"
                    max={duration}
                    onInput={(event) => setSeekTime(event.target.value)}
                    setSeekTime={setSeekTime}
                    appTime={appTime}
                />
                <Player
                    activeSong={activeSong}
                    volume={volume}
                    isPlaying={isPlaying}
                    seekTime={seekTime}
                    repeat={repeat}
                    currentIndex={currentIndex}
                    onEnded={handleNextSong}
                    onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
                    onLoadedData={(event) => setDuration(event.target.duration)}
                />
            </div>
            <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
        </div>
    );
};

export default MusicPlayer;
