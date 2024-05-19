/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong3, setSongList } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import 'swiper/css';
import 'swiper/css/free-mode';

const PlaylistCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
    <div className={`w-full flex flex-row items-center animate-slideup hover:bg-[#4c426e] ${(activeSong?.attributes?.name === song?.attributes.name && activeSong?.attributes?.artistName === song?.attributes?.artistName) ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
        <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
        <div className="flex-1 flex flex-row justify-between items-center">
            <img className="w-20 h-20 rounded-lg" src={song?.attributes.artwork.url} alt={song?.attributes.name} />
            <div className="flex-1 flex flex-col justify-center mx-3">
                <p className="text-xl font-bold text-white">
                    {song?.attributes.name}
                </p>
                <p className="text-base text-gray-300 mt-1">
                    {song?.attributes.artistName}
                </p>
            </div>
        </div>
        <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
        />
    </div>
);

const PlayList = ({setTarget}) => {
    const dispatch = useDispatch();
    const { playlist, activeSong, isPlaying } = useSelector((state) => state.player);
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });


    const handlePauseClick = () => {
        setTarget(true);
        dispatch(playPause(false));
    };

    const handlePlayClick = (song, i) => {
        const data = song;
        setTarget(true);
        dispatch(setActiveSong3({ song, data, i }));
        dispatch(playPause(true));
    };
    return (
        <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
            <div className="w-full flex flex-col">
                <div className="mt-4 flex flex-col gap-1">
                    {playlist?.map((song, i) => (
                        <PlaylistCard
                            key={song.key}
                            song={song}
                            i={i}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            handlePauseClick={handlePauseClick}
                            handlePlayClick={() => handlePlayClick(song, i)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlayList;
