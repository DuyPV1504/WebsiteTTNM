import React, { useState } from "react";
import User from "../components/User";
import { RadioGroup } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ParticleBackground from 'react-particle-backgrounds';
import "./Home.css"
import { useStore, useSelector, useDispatch } from "react-redux";
import { setCurUserIdx } from "../redux/features/playerSlice";
const accounts = [
  {
    id: "374ed1e4-481b-4074-a26e-6137657c6e35",
    fullName: "Hồ Thị Thanh Bình",
    picture: "Binh/Binh.png",
    audioUrl: "",

  },
  {
    id: "86732f46-99a4-435c-120e-4d72bb13305a",
    fullName: "Đỗ Mạnh Dũng",
    picture: "Dung/Dung.jpg",
    audioUrl: "",
  },
  {
    id: "45922f4a-72a2-150b-223e-4d72bb13a305",
    fullName: "Phạm Vũ Duy",
    picture: "Duy/Duy.jpg",
    audioUrl: ""
  }
];

function UserSelect() {
  const handleAudio = () => {
    if (!speechSynthesis.speaking) {
      let utterance = new SpeechSynthesisUtterance("Choose your user profile");
      utterance.lang = 'vn-VN';
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    handleAudio();
  }, []);
  const [selected, setSelected] = useState(null);
  const [customUser, setCustomUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleName = (name) => {
    console.log(name);
  };

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


  const dispatch = useDispatch();
  const { curUserIdx } = useSelector((state) => state.player);
  const store = useStore();
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {

      // setArticles(articles);
      const url = "https://api.fpt.ai/hmi/tts/v5";
      const headers = new Headers({
        "Content-Type": "application/json",
        "api-key": "atXmVJ42hw6yJm0rZJ9RaCSinzYZeN19",
        speed: "",
        voice: "banmai",
      });

      const articlePromises = accounts.map(async (account) => {
        const response1 = await fetch(url, {
          method: "POST",
          headers: headers,
          body: account.fullName,
        });

        const data1 = await response1.json();
        // replace the article's audioUrl with the API response
        account.audioUrl = data1.async; // replace 'async' with the actual property from the API response
        // article.audioUrl = data2.async;
        return account;
      });
      const updatedArticles = await Promise.all(articlePromises);
      setUserList(updatedArticles);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (curUserIdx !== -1) {
      let audio = new Audio(userList[curUserIdx]?.audioUrl);
      audio.play();
      setSelected(accounts[curUserIdx]);
      setCustomUser(null);
    }
  }, [curUserIdx])
  console.log(selected);

  const handleKeyboardPress = (event) => {
    let userIdx = store.getState().player.curUserIdx;
    if (event.key === 'ArrowRight') {
      userIdx = (userIdx + 1) % accounts.length;
      const val = userIdx;

      dispatch(setCurUserIdx({ val }));
    }
    else if (event.key === 'ArrowLeft') {
      if (userIdx !== 0) {
        userIdx = (userIdx - 1);
      }
      else {
        userIdx = accounts.length - 1;
      }
      const val = userIdx;
      dispatch(setCurUserIdx({ val }));
    }
    else if (event.key === 'Enter' && userIdx !== -1) {
      var link = document.getElementById("loginUserButton").firstChild;
      console.log(link);
      link.click();
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
      <div className="content2">
        <div className="h-full flex flex-col items-center justify-center gap-[24px] w-full max-w-[720px] mx-auto">
          <h1 className="text-2xl animate-slideup font-semibold text-blue-900">Select profile</h1>
          <div className="w-full p-4 text-right">
            <div className="mx-auto w-full max-w-md animate-slideup">
              <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                <div className="space-y-2">
                  {accounts.map((account) => (
                    <User key={account.id} user={account} />
                  ))}

                  {customUser && (
                    <div
                      className="relative"
                      onFocus={handleName(customUser.fullName)}
                    >
                      <User key={customUser.id} user={customUser} type="CUSTOM" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="text-blue-800 w-6 h-6 absolute top-1/2 -translate-y-1/2 right-[-32px] cursor-pointer"
                        onClick={() => {
                          setCustomUser(null);
                          selected?.type === "CUSTOM" && setSelected(accounts[0]);
                        }}
                        onFocus={handleName(accounts[0].fullName)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </RadioGroup>
              {!customUser && (
                <div className="flex flex-col items-center justify-center w-full mt-3">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:border-blue-200 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center py-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-blue-500 mb-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                      </svg>
                      <p className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Click to upload image
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or JPEG
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="hidden"
                      onChange={async (e) => {
                        const files = e.target.files;
                        if (files == null || files.length == 0) {
                          setErrorMessage("No files wait for import.");
                          return;
                        }
                        let file = files[0];
                        let name = file.name;
                        let suffixArr = name.split("."),
                          suffix = suffixArr[suffixArr.length - 2];

                        const base64 = await convertBase64(file);

                        const user = {
                          id: "custom",
                          fullName: suffix,
                          type: "CUSTOM",
                          picture: base64,
                        };
                        setCustomUser(user);
                        setSelected(user);
                      }}
                    />
                  </label>
                  {errorMessage && (
                    <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
                  )}
                </div>
              )}
              <div id='loginUserButton'>
                <Link
                  to="/login"
                  state={{ account: selected }}
                  className="mt-4 inline-flex items-center rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900"
                >
                  Login
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-1.5 h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSelect;
