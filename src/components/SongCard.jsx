import React from 'react';
import { Link } from 'react-router-dom';
import { useStore, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PlayPause from './PlayPause';
import { playPause, setActiveSong2, setSongList } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i, setTarget }) => {
    const dispatch = useDispatch();
    const store = useStore();
    const handlePauseClick = () => {
        setTarget(false);
        dispatch(playPause(false));
    };

    const handlePlayClick = () => {
        setTarget(false);
        dispatch(setActiveSong2({ song, data, i }));
        dispatch(playPause(true));
    };

    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <div className="relative w-full h-56 group">
                <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${(activeSong?.attributes?.name === song?.attributes.name && activeSong?.attributes?.artistName === song?.attributes?.artistName) ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
                    <PlayPause
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        song={song}
                        handlePause={handlePauseClick}
                        handlePlay={handlePlayClick}
                    />
                </div>
                <img alt="song_img" src={song?.attributes.artwork.url} className="w-full h-full rounded-lg" />
            </div>

            <div className="mt-4 flex flex-col">
                <p className="font-semibold text-lg text-white truncate">
                    {song?.attributes.name}
                </p>
                <p className="text-sm truncate text-gray-300 mt-1">
                    {song?.attributes.artistName}
                </p>
            </div>
        </div>
    );
};

export default SongCard;
