"use client";
import React, { useState } from "react";
import Link from "next/link";
// import { currentUser } from "@clerk/nextjs/app-beta";
import { FiSearch } from "react-icons/fi";
import { SignedOut, UserButton, SignedIn, SignInButton } from "@clerk/nextjs";
import { useOrganization, useSession, useUser } from "@clerk/nextjs";
const Searchbar = () => {
  const { isLoaded, user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // navigate(`/search/${searchTerm}`);
  };

  return (
    <div className="flex">
      <p className="text-2xl font-bold m-7 text-white">
        {`Welcome back, ${user?.firstName}`}
      </p>
      <div className="justify-end items-end">
        <form
          onSubmit={handleSubmit}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="flex justify-center my-auto">
        <SignedOut>
          <Link href="/sign-up">
            <button className="flexCenter my-auto ml-28 px-4 py-2 bg-violet-500 rounded-xl text-sm font-medium max-md:w-full text-white">
              Sign in
            </button>
          </Link>
        </SignedOut>
        <SignInButton className="flex">
          <UserButton />
        </SignInButton>
      </div>
    </div>
  );
};

export default Searchbar;
