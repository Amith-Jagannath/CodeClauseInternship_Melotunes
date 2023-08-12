import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  HiPlay,
  HiArrowCircleLeft,
  HiArrowCircleRight,
  HiPause,
} from "react-icons/hi";
const PlayerDiv = () => {
  const [song, setSong] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef < HTMLAudioElement > null;
  const progressUpdate = () => {};
  const handlePlayClick = (key) => {
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
  return (
    <>
      <div className="fixed bottom-5 bg-blue-600 w-full p-8 rounded-lg flex-col justify-center text-center ">
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
        </div>

        <div>
          <input
            type="range"
            value={progress.toString()}
            onChange={progressUpdate}
            style={{ width: "400px", height: "5px", color: "white" }}
          />
        </div>
      </div>
      <div style={{ display: "none" }}>
        <audio ref={audioRef}>
          {/* <source src={`/audio/${song}.mp3`} type="audio/mpeg" /> */}
          {/* <source src="/audio/sanam_re.mp3" type="audio/mpeg" /> */}
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
};

export default PlayerDiv;
