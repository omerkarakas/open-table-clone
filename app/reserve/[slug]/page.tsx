import React from "react";
import NavBar from "../../components/NavBar";
import Form from "./components/Form";
import Header from "./components/Header";

type Props = {};

const Reserve = (props: Props) => {
  return (
    <>
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          <Header />
          <Form />
        </div>
      </div>
    </>
  );
};

export default Reserve;
