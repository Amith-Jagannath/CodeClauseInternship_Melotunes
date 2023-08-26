"use client";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Searchbar from "../components/Searchbar";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import mediaData from "../../constants";
import { useSession } from "next-auth/react";
import {
  HiPlay,
  HiArrowCircleLeft,
  HiArrowCircleRight,
  HiPause,
  HiHeart,
} from "react-icons/hi";

// import { User, FavSong } from "../models/user";
export default function Home() {
  const { status, data: session } = useSession();
  const user = session?.user?.name;
  const router = useRouter();
  const [load, setload] = useState(true);
  const [song, setSong] = useState("");
  const [songData, setSongData] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songLists, setSongLists] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("liked");
        // Fetch the session asynchronously

        const userData = localStorage.getItem("userData");
        if (userData !== null) {
          const user = JSON.parse(userData);

          console.log(user);
          const res = await fetch("http://localhost:3000/api/likedSongs", {
            // Use a relative path for the API endpoint
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user,
            }),
          });

          if (!res.ok) {
            throw new Error(
              `Failed to like song: ${res.status} - ${res.statusText}`
            );
          }

          const data = await res.json();
          console.log(data.songs);
          setSongLists(data.songs);
        }
      } catch (error) {
        console.error("An error occurred while liking the song:", error);
      }
    }
    fetchData();
    const timeout = setTimeout(() => {
      setload(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    if (isPlaying) {
      for (let i = 0; i < mediaData.length; i++)
        if (mediaData[i].source === song) {
          setSongData(i);
        }
    }
  }, [song, isPlaying]);

  const handleBackBtnClick = () => {
    console.log(songData);
    if (songData > 0) setSongData(songData - 1);
    setSong(mediaData[songData].source);
    console.log(songData);
  };
  const handleFrontBtnClick = () => {
    if (songData > 0) setSongData(songData + 1);
    setSong(mediaData[songData].source);
  };
  const handlePlayClick = (key: string) => {
    setSong(key);
    setIsPlaying(!isPlaying); // Set audio play state to true when user clicks play
    const newProgress = parseFloat(progress.toString());
    setProgress(progress);
    // console.log(newProgress);
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);
      // console.log(progress);
    }
  };
  const handlePauseClick = () => {
    setIsPlaying(false);
    // console.log("pausing song");
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setProgress(progress);
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);
    }
  };

  useEffect(() => {
    // console.log("Updated song:", song);
    // console.log(isPlaying);
    // console.log(audioRef.current);
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const progressPercentage = (currentTime / duration) * 100;
        if (isPlaying == false) setProgress(progress);
        else setProgress(progressPercentage);
      }
    };

    if (audioRef.current) {
      audioRef.current.src = `/audio/${song}.mp3`; // Set the src based on the song value
      audioRef.current.load(); // Load the new audio source
      if (isPlaying) {
        audioRef.current.play(); // Play audio when isPlaying is true
      } else {
        audioRef.current.pause(); // Pause audio when isPlaying is false
      }
    }
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [song, isPlaying, songData]);
  const progressUpdate = (e: any) => {
    const newProgress = parseFloat(e.target.value);
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = (newProgress / 100) * duration;
      audioRef.current.currentTime = currentTime;
      setProgress(newProgress);
    }
  };
  const handleLiking = () => {};
  const removeLikedSong = async (song: String) => {
    console.log(song);
    setload(false);
    const userData = localStorage.getItem("userData");
    if (userData !== null) {
      const user = JSON.parse(userData);
      try {
        const res = await fetch("http://localhost:3000/api/deleteLiked", {
          // Use a relative path for the API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
            song,
          }),
        });

        if (!res.ok) {
          throw new Error(
            `Failed to like song: ${res.status} - ${res.statusText}`
          );
        }

        console.log("Song liked successfully!");
        window.location.reload();
      } catch (error) {
        console.error("An error occurred while liking the song:", error);
      }
    }
  };

  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>;
  return (
    <div>
      <div className="flex ">
        <Sidebar />
        <div className="flex-1 w-1/2 flex-col bg-zinc-900 flex-w">
          <Searchbar />
          <header>
            <div className="banner__contents">
              <h1 className="banner__title text-7xl text-white">Liked songs</h1>
            </div>
            <div className="banner__fadeButton"></div>
          </header>
          {load && user ? (
            <p className="text-3xl text-white flex justify-center items-center mt-10">
              Loading....
            </p>
          ) : (
            <div>
              {songLists.length > 0 ? (
                <div>
                  {" "}
                  {songLists.map((song, index) => (
                    <div
                      key={index} // Adding a unique key for each rendered component
                      className="bg-zinc-700 mx-10 h-16 rounded-lg flex items-center justify-center mb-3"
                    >
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 lg:grid-cols-3 gap-4">
                        <div
                          className="flex items-center"
                          onClick={() =>
                            handlePlayClick(mediaData[song.index].source)
                          }
                        >
                          <p className="text-white mx-4">{index + 1}</p>
                          <Image
                            src={`/poster/${mediaData[song.index].source}.webp`}
                            width={40}
                            height={40}
                            className="rounded-lg"
                            alt="songs"
                          />
                          <div className="flex-col text-sm text-white mx-4">
                            <p>{song.song}</p>
                            <p>{mediaData[song.index].artist}</p>
                          </div>
                        </div>

                        <div className="text-white my-auto">
                          Dil {mediaData[song.index].album}
                        </div>
                        <div className="my-auto ml-60 text-3xl left-10  transition-transform transform hover:scale-110">
                          <Image
                            onClick={() => removeLikedSong(song.song)}
                            className="mt-1"
                            src="/heart.png"
                            alt="heart"
                            width={30}
                            height={30}
                          ></Image>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : user ? (
                <p className="text-3xl text-white flex justify-center items-center mt-10">
                  Didn't Add Any Song!!
                </p>
              ) : (
                <p className="text-3xl text-white flex justify-center items-center mt-10">
                  Login to create playlist!!
                </p>
              )}{" "}
            </div>
          )}

          <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse"></div>
        </div>
      </div>
      <div className=" fixed bottom-0 bg-black w-full p-6 rounded-tl-lg rounded-tr-lg grid grid-cols-3 gap-4 text-center ">
        <div className="justify-start flex gap-2">
          {songData != -1 && (
            <>
              {" "}
              <Image
                src={`/poster/${song}.webp`}
                width={40}
                height={40}
                alt="song"
                className="justify-start"
              />
              <div className="flex-col text-white my-auto ">
                <p className="text-xs font-bold">{mediaData[songData].name}</p>
                <p className="text-xs">{mediaData[songData].artist}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex-col">
          {" "}
          <div className="flex text-center justify-center">
            <HiArrowCircleLeft
              onClick={handleBackBtnClick}
              className="text-white text-3xl"
            />
            {isPlaying ? (
              <HiPause
                onClick={() => handlePauseClick()}
                className="text-white text-3xl"
              />
            ) : (
              <HiPlay
                onClick={() => handlePlayClick(song)}
                className="text-white text-3xl"
              />
            )}
            <HiArrowCircleRight
              onClick={handleFrontBtnClick}
              className="text-white text-3xl"
            />
            <div className="transition-transform transform hover:scale-110">
              <Image
                onClick={handleLiking}
                className=""
                src="/heart.png"
                alt="heart"
                width={30}
                height={30}
              ></Image>
            </div>
          </div>
          <div>
            <input
              type="range"
              value={progress.toString()}
              onChange={progressUpdate}
              style={{ width: "400px", height: "3px", color: "white" }}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "none" }}>
        <audio ref={audioRef}>
          {/* <source src={`/audio/${song}.mp3`} type="audio/mpeg" /> */}
          {/* <source src="/audio/sanam_re.mp3" type="audio/mpeg" /> */}
          {/* Your browser does not support the audio element. */}
        </audio>
      </div>
    </div>
  );
}
