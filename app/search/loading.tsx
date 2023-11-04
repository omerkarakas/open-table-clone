import React from "react";
import Header from "./components/Header";

type Props = {};

const Loading = (props: Props) => {
  return (
    <main>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <div className="w-1/5 animate-pulse bg-slate-200"></div>
        <div className="w-5/6">
          {[...Array(12)]
            .map((v, i) => i + 1)
            .map((num) => (
              <div
                key={num}
                className="animate-pulse bg-slate-200 w-96 h-48 m-3 rounded overflow-hidden border cursor-pointer"
              ></div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
