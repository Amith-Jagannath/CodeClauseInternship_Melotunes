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
    <div className="flex-shrink-0">
      <img
        className="row__poster row__posterLarge image"
        onClick={onClick}
        key={title}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        src={`/poster/${source}.webp`}
        alt={title}
      />
      {isHovered && (
        <div className=" buttom-0  bg-black bg-opacity-20 text-white p-2 text-center transform-gpu transition-transform duration-300 ease-in-out translate-y-0 group-hover:-translate-y-full">
          {title}
        </div>
      )}
    </div>
  );
};

export default Card;
