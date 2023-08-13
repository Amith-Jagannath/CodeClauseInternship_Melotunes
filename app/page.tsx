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
  };
  const handlePauseClick = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
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
  const progressUpdate = () => {};
  <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>;
  return (
    <div>
      <div className="flex ">
        <Sidebar />
        <div className="flex-1 w-1/2 flex-col bg-zinc-900">
          <Searchbar />
          <div className="flex row">
            <Card
              onClick={() => handlePlayClick("sanam_re")}
              key="sanam_re"
              image="/poster/sanam_re.webp"
              title="Sanam Re"
            />
            <Card
              onClick={() => handlePlayClick("wajah_tum_ho")}
              image="/poster/wajah_tum_ho.webp"
              title="Wajah Tum ho"
            />

            {/* <Card image="https://media5.bollywoodhungama.in/wp-content/uploads/2023/07/Double-ISmart.jpg" />  */}
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
                onClick={() => handlePlayClick(song)}
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
