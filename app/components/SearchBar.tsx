"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const SearchBar = (props: Props) => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    if (location === "") return;
    router.push(`/search?city=${location}`);
    setLocation("");
  };

  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <form onSubmit={(e) => formSubmitHandler(e)}>
        <input
          className="rounded  mr-3 p-2 w-[450px]"
          type="text"
          placeholder="State, city or town"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          className="rounded bg-red-600 px-9 py-2 text-white"
          type="submit"
          // onClick={() => {
          //   if (location === "") return;
          //   router.push(`/search?city=${location}`);
          //   setLocation("");
          // }}
        >
          Let's go
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
