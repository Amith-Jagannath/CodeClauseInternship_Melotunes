"use client";
import React from "react";
import { useState } from "react";

const Card = ({ onClick, image, title }) => {
  return (
    <div
      className="relative group w-52 h-60 mx-auto row__posters"
      onClick={onClick}
    >
      <div className="bg-gray-950 p-4 rounded-lg shadow-md overflow-hidden transform transition-transform group-hover:scale-105 w-full h-full">
        <img
          src={image}
          alt="title"
          className="w-full  h-full ease-in duration-300 object-cover hover:h-3/4"
        />
        <p className="translate-y-4 text-white my-auto">{title}</p>
      </div>
    </div>
  );
};

export default Card;
