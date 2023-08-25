"use client";
import React from "react";
import { useState } from "react";

import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { RiCloseLine } from "react-icons/Ri";
import Link from "next/link";

const links = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Liked Songs", to: "/liked", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4  h-auto bg-gradient-to-r from-purple-500 to-indigo-500">
        {/* <img
          src="./logo.svg"
          alt="logo"
          className="w-full h-14 object-contain"
        /> */}
        <Link
          href={"/"}
          className="text-bold mx-auto text-3xl hover:cursor-pointer  text-gray-400 hover:text-cyan-400"
        >
          Melotunes
        </Link>
        <div className="mt-10">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.to}
              to={item.to}
              className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
              onClick={() => handleClick && handleClick()}
            >
              <item.icon className="w-6 h-6 mr-2" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img
          src="./logo.svg"
          alt="logo"
          className="w-full h-14 object-contain"
        />
        {/* <Links handleClick={() => setMobileMenuOpen(false)} /> */}
      </div>
    </>
  );
};

export default Sidebar;
