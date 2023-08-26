"use client";
import React from "react";
import { useState } from "react";
const Card = ({ onClick, image, title, source }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className={`flex-shrink-0 ${isHovered ? "h-auto" : "h-[200px]"}`}>
      <img
        className={`row__poster row__posterLarge image ${
          isHovered ? "scale-75" : ""
        }`}
        onClick={onClick}
        key={title}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        src={`/poster/${source}.webp`}
        alt={title}
      />
      {isHovered && (
        <div
          className={`bottom-0 bg-black bg-opacity-20 text-white p-2 text-center transform-gpu transition-transform duration-300 ease-in-out ${
            isHovered ? "-translate-y-full" : ""
          }`}
        >
          {title}
        </div>
      )}
    </div>
  );
};

export default Card;
