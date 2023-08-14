"use client";
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";
import Searchbar from "./components/Searchbar";
import { useRef, useState, useEffect } from "react";
import Liked from "./components/Liked";
import mediaData from "../constants";
import {
  HiPlay,
  HiArrowCircleLeft,
  HiArrowCircleRight,
  HiPause,
  HiHeart,
} from "react-icons/hi";

export default function Home() {
  const [song, setSong] = useState("");
  const [songData, setSongData] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  // const user = await getCurrentUser();
  useEffect(() => {
    if (isPlaying) {
      for (let i = 0; i < mediaData.length; i++)
        if (mediaData[i].source === song) {
          setSongData(i);
        }
    }
  }, [song, isPlaying]);
  console.log(songData);

  const handlePlayClick = (key: string) => {
    setSong(key);
    setIsPlaying(!isPlaying); // Set audio play state to true when user clicks play
    const newProgress = parseFloat(progress.toString());
    setProgress(progress);
    console.log(newProgress);
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);
      console.log(progress);
    }
  };
  const handlePauseClick = () => {
    setIsPlaying(false);
    console.log("pausing song");
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);
      console.log(progress);
    }
  };

  useEffect(() => {
    console.log("Updated song:", song);
    console.log(isPlaying);
    console.log(audioRef.current);
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const progressPercentage = (currentTime / duration) * 100;
        setProgress(progressPercentage);
        console.log(progress);
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
  }, [song, isPlaying]);
  const progressUpdate = (e: any) => {
    const newProgress = parseFloat(e.target.value);
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = (newProgress / 100) * duration;
      audioRef.current.currentTime = currentTime;
      setProgress(newProgress);
    }
  };
  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>;
  return (
    <div>
      <div className="flex ">
        <Sidebar />
        <div className="flex-1 w-1/2 flex-col bg-zinc-900">
          <Searchbar />
          <div className="row">
            <h1 className="text-white text-xl">Bollywood</h1>
            <div className="row__posters flex justify-start flex-4">
              {mediaData.map(({ type, source, name }) =>
                type === "bollywood" ? (
                  <Card
                    onClick={() => handlePlayClick(source)}
                    key={source}
                    image={`/poster/${source}.webp`}
                    title={name}
                    source={source}
                  />
                ) : null
              )}
            </div>
          </div>
          <div className="row">
            <h1 className="text-white text-xl">Hollywood</h1>
            <div className="row__posters image-wrapper ">
              {mediaData.map(({ type, source, name }) =>
                type === "hollywood" ? (
                  <Card
                    onClick={() => handlePlayClick(source)}
                    key={source}
                    image={`/poster/${source}.webp`}
                    title={name}
                    source={source}
                  />
                ) : null
              )}
            </div>
          </div>

          <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse"></div>
        </div>
      </div>
      <div className=" fixed bottom-0 bg-gray-800 w-full p-6 rounded-tl-lg rounded-tr-lg grid grid-cols-3 gap-4 text-center ">
        <div className="justify-start flex gap-2">
          {isPlaying && songData != -1 && (
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
            <HiArrowCircleLeft className="text-white text-3xl" />
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
            <HiArrowCircleRight className="text-white text-3xl" />
            <Liked />{" "}
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
