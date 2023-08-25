"use client";
import React, { useEffect, useState } from "react";

// import { currentUser } from "@clerk/nextjs/app-beta";
import { signIn, signOut } from "next-auth/react";
import { FiSearch } from "react-icons/fi";
import { useSession } from "next-auth/react";

const Searchbar = () => {
  const { status, data: session } = useSession();
  return (
    <div className="flex">
      <p className="text-2xl font-bold m-7 text-white font-poppins">
        {session
          ? `Welcome Back, ${session?.user.name.split(" ")[0]}`
          : `Welcome,login here!!`}
      </p>
      {/* <div className="">
        <form
          autoComplete="off"
          className="p-2 text-gray-400 focus-within:text-gray-600 ml-96 w-1/4"
        >
          <label htmlFor="search-field" className="sr-only">
            Search all files
          </label>
          <div className="flex flex-row justify-start items-center">
            <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
            <input
              name="search-field"
              autoComplete="off"
              id="search-field"
              className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4"
              placeholder="Search"
              type="search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div> */}
      <div className="flex ml-96  my-auto">
        {status === "authenticated" ? (
          <button
            onClick={() => {
              // Clear user data from localStorage
              localStorage.removeItem("userData");

              // Perform the sign-out action
              signOut("google");
            }}
            className="flex ml-96  my-auto px-4 py-2 bg-violet-500 rounded-xl text-sm font-medium max-md:w-full text-white"
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="flex  my-auto ml-96 px-4 py-2 bg-violet-500 rounded-xl text-sm font-medium max-md:w-full text-white"
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
