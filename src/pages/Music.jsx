import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useStore } from 'react-redux';

import { useGetSongsByCountryQuery, useGetSongsBySearchQuery } from '../redux/services/shazamCore';

import { MUINavBar } from '../components/MUINavBar'
import SpeechReg from '../components/SpeechReg';

import ReactLoading from 'react-loading';
import SongCard from '../components/SongCard';
import MusicPlayer from '../components/MusicPlayer';
import { setCurTarget, setActiveSong1, setSearching, setSearchString, setSongList } from '../redux/features/playerSlice';
import { useDispatch } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import "./Radio.css"
import PlayList from '../components/PlayList';
const Music = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');
  const [target, setTarget] = useState(false);
  const store = useStore();

  const handleAudio = () => {
    if (!speechSynthesis.speaking) {
      let utterance = new SpeechSynthesisUtterance("Welcome to radio.");
      utterance.lang = 'vn-VN';
      speechSynthesis.speak(utterance);
    }
  }

  useEffect(() => {
    handleAudio();
  }, []);

  let said1 = false;
  useEffect(() => {
    if (said1) return;
    said1 = true;
    if (target) {
      let utterance = new SpeechSynthesisUtterance("Your playlist");
      utterance.lang = 'vn-VN';
      speechSynthesis.speak(utterance);
    }
    else {
      let utterance = new SpeechSynthesisUtterance("Homepage");
      utterance.lang = 'vn-VN';
      speechSynthesis.speak(utterance);
    }
  }, [target]);

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const getData = () => {
    if (searchTerm1 !== '') {
      return useGetSongsBySearchQuery(searchTerm1);
    }
    else if (searchTerm1 === '') {
      return useGetSongsByCountryQuery('US');
    }
  }
  let { data, isFetching, error } = getData();


  if (data !== undefined) {
    if (data.tracks !== undefined) {

      let newData = [];
      for (let i = 0; i < data.tracks.hits.length; i++) {
        const track = data.tracks.hits[i].track;
        let tmp = {
          attributes: {
            name: 'a',
            artistName: 'a',
            artwork: {
              url: 'a',
            },
            previews: [
              {
                url: 'a',
              },
            ],
          },
          id: 0,
        };
        tmp.id = track.key;
        tmp.attributes.name = track.title;
        tmp.attributes.artistName = track.subtitle;
        tmp.attributes.artwork.url = track.images.coverart;
        tmp.attributes.previews[0].url = track.hub.actions[1].uri;
        newData.push(tmp);
      }
      data = newData;
    }

    const data1 = store.getState().player.currentSongs1;
    const type = searchTerm1 === '' ? 1 : 2;
    if (data !== undefined && data1 !== undefined && data1.length !== data.length) {
      dispatch(setSongList({ data, type }));
    }
    else if (data !== undefined && data1 !== undefined && data1.length === data.length) {
      let dif = false;
      for (let i = 0; i < data1.length; ++i) {
        if (data1[i].name !== data[i].name || data1[i].artistName !== data[i].artistName) {
          dif = true;
        }
      }
      if (dif) {
        dispatch(setSongList({ data, type }));
      }
    }
    else if ((data1.length === 0 || data1 === undefined) && data !== undefined && data.length > 0) {
      dispatch(setSongList({ data, type }));
    }
  }
  const handleKeyboardPress = (event) => {
    const isSearching = store.getState().player.searching;
    const isActive = store.getState().player.isActive;
    const data1 = store.getState().player.currentSongs1;
    const newList = store.getState().player.newList;
    const curSearch = store.getState().player.searchString;
    if (!isActive || (newList)) {
      if (event.key === 'ArrowRight') {
        if (data1 !== undefined && data1.length > 0) {
          let song = data1[0];
          let i = 0;

          dispatch(setActiveSong1({ song, data1, i }))
        }
      }
    }
    if (!isSearching && event.key === 'Shift') {
      const curTarget = store.getState().player.curTarget;
      const val = !curTarget;
      dispatch(setCurTarget({ val }));
      setTarget((target) => (!target));
      return;
    }
    if (!isSearching) {
      return;
    }
    
    if (event.key === 'Enter') {
      console.log("IS SEARCHING");
      const searchWhat = store.getState().player.searchString;
      setSearchTerm1(searchWhat);
      const searchField = document.getElementById("search-field");
      const val = false;
      dispatch(setCurTarget({ val }));
      setTarget(false);
      setTimeout(() => {
        searchField.blur();
      }, 500);
    }
    else if (event.key === 'Escape') {
      let utterance = new SpeechSynthesisUtterance("Stop searching");
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
      setSearchTerm("");
      const searchField = document.getElementById("search-field");

      searchField.blur();

    }
    else {
      if (event.key !== ' ') {
        let utterance = new SpeechSynthesisUtterance(event.key);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
      }
      else {
        let utterance = new SpeechSynthesisUtterance('space');
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
      }
    }
  };

  let searching = false;
  let searchString = '';

  useEffect(() => {
    dispatch(setSearching({ searching }));
    dispatch(setSearchString({ searchString }));
  }, []);


  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardPress)
    return () => {
      window.removeEventListener("keydown", handleKeyboardPress) // this event listener is removed after the new route loads
    }
  }, []);
  let said = false;
  useEffect(() => {
    if (isFetching && !said) {
      let utterance = new SpeechSynthesisUtterance("Loading");
      utterance.lang = 'vn-VN';
      speechSynthesis.speak(utterance);
      said = true;
    }
  }, [isFetching]);


  return (<>
    <MUINavBar />
    <SpeechReg />
    <div className="relative flex">
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <div className="p-2 text-gray-400 focus-within:text-gray-600">
          <div className="flex flex-row justify-start items-center">
            <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
            <input
              name="search-field"
              autoComplete="off"
              id="search-field"
              className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4"
              placeholder="Search"
              type="search"
              value={searchTerm}
              onChange={(e) => { searchString = e.target.value; dispatch(setSearchString({ searchString })); setSearchTerm(e.target.value); }}
              onFocus={(e) => {
                if (!speechSynthesis.speaking) {
                  let utterance = new SpeechSynthesisUtterance("Start searching");
                  utterance.lang = 'en-US';
                  speechSynthesis.speak(utterance);
                }
                searching = true; dispatch(setSearching({ searching }))
                searchString = localStorage.getItem("searchTerm");
                setSearchTerm(localStorage.getItem("searchTerm"));
                dispatch(setSearchString({ searchString })); 
              }}
              onBlur={(e) => { searching = false; dispatch(setSearching({ searching })) }}
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex-auto w-[calc(50vh)] px-6 h-[calc(92vh-72px)] overflow-y-scroll no-scrollbar">
            {
              !target ?
                <h2 className="font-bold text-3xl text-red-500 text-left mt-4 mb-10">Discover Music</h2>
                :
                <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Music</h2>
            }

            {(isFetching)
              ?
              <div className="flex justify-center items-center text-center">
                <ReactLoading type={"bars"} color={"green"} height={200} width={200} />
              </div>
              :
              <div className="flex flex-col">


                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                  {data?.map((song, i) => (
                    <SongCard
                      key={song.id}
                      song={song}
                      isPlaying={isPlaying}
                      activeSong={activeSong}
                      data={data}
                      i={i}
                      setTarget={setTarget}
                    />
                  ))}
                </div>

              </div>
            }
          </div>
          <div className="flex-1 w-10 px-6 h-[calc(92vh-72px)] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col">
              {
                target ?
                  <h2 className="font-bold text-2xl text-red-500 text-left mb-10">Your Playlist</h2>
                  :
                  <h2 className="font-bold text-2xl text-white text-left mb-10">Your Playlist</h2>
              }

              <PlayList setTarget={setTarget} />

            </div>
          </div>
        </div>
      </div>
      {activeSong?.attributes?.name && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  </>);
};

export default Music;
