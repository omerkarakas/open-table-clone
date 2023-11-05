"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthModalForm from "./AuthModalForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #5f6984",
  boxShadow: 24,
  p: 4,
};

export type AuthFormInputsType = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  email: string;
  password: string;
};

export type handleInputChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputs, setInputs] = useState<AuthFormInputsType>({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    email: "",
    password: "",
  });

  // const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const handleInputChange: handleInputChangeType = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button
        className={`border p-1 px-4 rounded mr-3 ${isSignIn ? "bg-blue-400 text-white " : ""}`}
        onClick={handleOpen}
      >
        {isSignIn ? "Sign in" : "Sign up"}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2 h-96">
            <div className="uppercase font-bold text-center pb-2 border-b mb-2 border-blue-400">
              <p className="text-sm">{isSignIn ? "Sign In" : "Create Account"}</p>
            </div>

            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {isSignIn ? "Log Into Your Account" : "Create Your OpenTable Account"}
              </h2>
              <AuthModalForm
                inputs={inputs}
                handleInputChange={handleInputChange}
                isSignIn={isSignIn}
              />
              <button className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400">
                {isSignIn ? "Sign In" : "Create Account"}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
