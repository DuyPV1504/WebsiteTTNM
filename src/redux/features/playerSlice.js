import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSongs: [],
    currentSongs1: [],
    currentIndex: 0,
    isActive: false,
    isPlaying: false,
    activeSong: {},
    genreListId: '',
    searching: false,
    searchString: '',
    newList: false,
    newList1: false,
    replayMode: false,
    shuffleMode: false,
    playlist: [],
    heart: false,
    curTarget: false,
    curPlaylistIdx: -1,
    cameraState: true,
    microphoneState: true,
    inCall: false,
    curRoomIdx: 0,
    isShowingSpeech: false,
    isListeningSpeech: false,
    curBookIdx: -1,
    curNewsIdx: -1,
    isReading: false,
    curUserIdx: -1,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addPlaylist: (state, action) => {
            let newSong = state.activeSong;
            state.playlist?.push(newSong);
        },
        removePlaylist: (state, action) => {
            let idx = -1;
            for (let i = 0; i < state.playlist.length; ++i) {
                if (state.playlist[i].attributes.name === state.activeSong.attributes.name &&
                    state.playlist[i].attributes.artistName === state.activeSong.attributes.artistName) {
                    idx = i;
                    break;
                }
            }
            if (idx >= 0) {
                state.playlist.splice(idx, 1);
            }
        },
        setSongList: (state, action) => {
            console.log("NEW SONG LIST");
            if (action.payload?.data?.tracks?.hits) {
                state.currentSongs1 = action.payload.data.tracks.hits;
            } else if (action.payload?.data?.properties) {
                state.currentSongs1 = action.payload?.data?.tracks;
            } else {
                state.currentSongs1 = action.payload.data;
            }

            state.currentIndex = -1;
            state.newList = true;
            state.newList1 = true;

            if (action.payload?.type === 1) {
                let utterance = new SpeechSynthesisUtterance("Top 200 world chart");
                utterance.lang = 'vn-VN';
                speechSynthesis.speak(utterance);
            }
            else {
                let utterance = new SpeechSynthesisUtterance("Search " + state.searchString + " and found " + action.payload.data.length + " results");
                utterance.lang = 'vn-VN';
                speechSynthesis.speak(utterance);
            }
        },
        setReplayMode: (state, action) => {
            state.replayMode = action.payload.val;
        },
        setCurTarget: (state, action) => {
            state.curTarget = action.payload.val;
        },
        setCurRoomIdx: (state, action) => {
            state.curRoomIdx = action.payload.valIdx;
        },
        setCurUserIdx: (state, action) => {
            state.curUserIdx = action.payload.val;
        },
        setCurBookIdx: (state, action) => {
            state.curBookIdx = action.payload.val;
        },
        setCurNewsIdx: (state, action) => {
            state.curNewsIdx = action.payload.val;
        },
        setShowSpeech: (state, action) => {
            state.isShowingSpeech = action.payload;
        },
        setListeningSpeech: (state, action) => {
            state.isListeningSpeech = action.payload;
        },
        setCamera: (state, action) => {
            state.cameraState = action.payload.val;
        },
        setInCall: (state, action) => {
            state.inCall = action.payload.val;
        },
        setIsReading: (state, action) => {
            state.isReading = action.payload;
        },
        setMicrophone: (state, action) => {
            state.microphoneState = action.payload.val;
        },
        setHeartMode: (state, action) => {
            state.heart = action.payload.val;
        },
        setShuffleMode: (state, action) => {
            state.shuffleMode = action.payload.val;
        },
        setNewList1: (state, action) => {
            state.newList1 = action.payload.val;
        },
        setSearching: (state, action) => {
            state.searching = action.payload.searching;
        },
        setSearchString: (state, action) => {
            state.searchString = action.payload.searchString;
        },
        setActiveSong: (state, action) => {
            if (!state.curTarget) {
                let utterance = new SpeechSynthesisUtterance(action.payload.song.attributes.name + " by " + action.payload.song.attributes.artistName);
                utterance.lang = 'vn-VN';
                speechSynthesis.speak(utterance);


                state.activeSong = action.payload.song;

                if (action.payload?.data?.tracks?.hits) {
                    state.currentSongs = action.payload.data.tracks.hits;
                } else if (action.payload?.data?.properties) {
                    state.currentSongs = action.payload?.data?.tracks;
                } else {
                    state.currentSongs = action.payload.data;
                }

                state.currentIndex = action.payload.i;
                state.curPlaylistIdx = -1;
                state.isActive = true;
            }
            else {
                if (!state.curTarget) {
                    let utterance = new SpeechSynthesisUtterance(action.payload.song.attributes.name + " by " + action.payload.song.attributes.artistName);
                    utterance.lang = 'vn-VN';
                    speechSynthesis.speak(utterance);


                    state.activeSong = action.payload.song;
                    state.currentIndex = -1;
                    state.curPlaylistIdx = action.payload.i;
                    state.isActive = true;
                }
            }
        },
        setActiveSong1: (state, action) => {
            let utterance = new SpeechSynthesisUtterance(action.payload.song.attributes.name + " by " + action.payload.song.attributes.artistName);
            utterance.lang = 'vn-VN';
            speechSynthesis.speak(utterance);


            state.activeSong = action.payload.song;

            if (action.payload?.data?.tracks?.hits) {
                state.currentSongs = action.payload.data.tracks.hits;
            } else if (action.payload?.data?.properties) {
                state.currentSongs = action.payload?.data?.tracks;
            } else {
                state.currentSongs = action.payload.data1;
            }

            state.currentIndex = action.payload.i;
            state.isActive = true;
            state.newList = false;
        },
        setActiveSong2: (state, action) => {
            let utterance = new SpeechSynthesisUtterance(action.payload.song.attributes.name + " by " + action.payload.song.attributes.artistName);
            utterance.lang = 'vn-VN';
            speechSynthesis.speak(utterance);


            state.activeSong = action.payload.song;

            if (action.payload?.data?.tracks?.hits) {
                state.currentSongs = action.payload.data.tracks.hits;
            } else if (action.payload?.data?.properties) {
                state.currentSongs = action.payload?.data?.tracks;
            } else {
                state.currentSongs = action.payload.data;
            }

            state.currentIndex = action.payload.i;
            state.curPlaylistIdx = -1;
            state.isActive = true;
            state.newList = false;
            state.curTarget = false;
        },
        setActiveSong3: (state, action) => {
            let utterance = new SpeechSynthesisUtterance(action.payload.song.attributes.name + " by " + action.payload.song.attributes.artistName);
            utterance.lang = 'vn-VN';
            speechSynthesis.speak(utterance);

            state.activeSong = action.payload.song;

            state.curPlaylistIdx = action.payload.i;
            state.currentIndex = -1;
            state.isActive = true;
            state.newList = false;
            state.curTarget = true;
        },
        nextSong: (state, action) => {
            if (!state.curTarget) {
                if (state.currentSongs[action.payload]?.track) {
                    state.activeSong = state.currentSongs[action.payload]?.track;
                } else {
                    state.activeSong = state.currentSongs[action.payload];
                }

                let utterance = new SpeechSynthesisUtterance(state.activeSong?.attributes.name + " by " + state.activeSong?.attributes.artistName);
                utterance.lang = 'vn-VN';
                speechSynthesis.speak(utterance);

                state.currentIndex = action.payload;
                state.curPlaylistIdx = -1;
                state.isActive = true;
            }
            else {
                let newIdx = (state.curPlaylistIdx + 1) % state.playlist.length;
                if (state.shuffleMode) {
                    newIdx = Math.floor(Math.random() * state.playlist.length);
                }
                if (state.playlist[newIdx]?.track) {
                    state.activeSong = state.playlist[newIdx]?.track;
                } else {
                    state.activeSong = state.playlist[newIdx];
                }

                let utterance = new SpeechSynthesisUtterance(state.activeSong?.attributes.name + " by " + state.activeSong?.attributes.artistName);
                utterance.lang = 'vn-VN';
                speechSynthesis.speak(utterance);

                state.curPlaylistIdx = newIdx;
                state.currentIndex = -1;
                state.isActive = true;
            }
        },

        prevSong: (state, action) => {
            if (!state.curTarget) {
                if (state.currentSongs[action.payload]?.track) {
                    state.activeSong = state.currentSongs[action.payload]?.track;
                } else {
                    state.activeSong = state.currentSongs[action.payload];
                }

                let utterance = new SpeechSynthesisUtterance(state.activeSong?.attributes.name + " by " + state.activeSong?.attributes.artistName);
                utterance.lang = 'vn-VN';
                speechSynthesis.speak(utterance);

                state.currentIndex = action.payload;
                state.isActive = true;
            }
            else {
                let newIdx = 0;
                if (state.curPlaylistIdx === 0) {
                    newIdx = state.playlist.length - 1;
                }
                else {
                    newIdx = (state.curPlaylistIdx - 1);
                }
                if (state.shuffleMode) {
                    newIdx = Math.floor(Math.random() * state.playlist.length);
                }
                if (state.playlist[newIdx]?.track) {
                    state.activeSong = state.playlist[newIdx]?.track;
                } else {
                    state.activeSong = state.playlist[newIdx];
                }

                let utterance = new SpeechSynthesisUtterance(state.activeSong?.attributes.name + " by " + state.activeSong?.attributes.artistName);
                utterance.lang = 'vn-VN';
                speechSynthesis.speak(utterance);

                state.curPlaylistIdx = newIdx;
                state.currentIndex = -1;
                state.isActive = true;
            }
        },

        playPause: (state, action) => {
            state.isPlaying = action.payload;
        },
        playPause1: (state, action) => {
            if (state.newList) {
                return;
            }
            state.isPlaying = action.payload;
        },
        selectGenreListId: (state, action) => {
            state.genreListId = action.payload;
        },
    },
});

export const { setCurUserIdx, setIsReading, setCurNewsIdx, setCurBookIdx, setListeningSpeech, setShowSpeech, setCurRoomIdx, setInCall, setCamera, setMicrophone, setActiveSong2, setActiveSong3, setCurTarget, setHeartMode, addPlaylist, removePlaylist, playPause1, setReplayMode, setShuffleMode, setSongList, setNewList1, setSearching, setSearchString, setActiveSong, setActiveSong1, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
