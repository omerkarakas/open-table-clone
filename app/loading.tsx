import React from "react";
import Header from "./components/Header";

type Props = {};

const loading = (props: Props) => {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {[...Array(12)]
          .map((v, i) => i + 1)
          .map((num) => (
            <div
              key={num}
              className="animate-pulse bg-slate-200 w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"
            ></div>
          ))}
      </div>
    </main>
  );
};

export default loading;
