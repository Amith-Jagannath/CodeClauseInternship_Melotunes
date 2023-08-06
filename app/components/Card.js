"use client";
import React from "react";
import { useState } from "react";

const Card = ({ onClick, image }) => {
  return (
    <div
      className="h-60 w-48 bg-black m-10 relative rounded-lg overflow-hidden"
      onClick={onClick}
    >
      <img className="w-full h-full object-cover " src={image} alt="hu" />
    </div>
  );
};

export default Card;
