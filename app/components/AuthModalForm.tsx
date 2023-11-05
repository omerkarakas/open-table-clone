import React from "react";
import { AuthFormInputsType, handleInputChangeType } from "./AuthModal";

type Props = {
  inputs: AuthFormInputsType;
  handleInputChange: handleInputChangeType;
  isSignIn: boolean;
};

const AuthModalForm = ({ inputs, handleInputChange, isSignIn }: Props) => {
  return (
    <div>
      {!isSignIn && (
        <>
          <div className="my-3 flex justify-between text-sm">
            <input
              type="text"
              className="border rounded p-2 py-3 w-[49%]"
              placeholder="First Name"
              value={inputs.firstName}
              name="firstName"
              onChange={(e) => handleInputChange(e)}
            />
            <input
              type="text"
              className="border rounded p-2 py-3 w-[49%]"
              placeholder="Last Name"
              value={inputs.lastName}
              name="lastName"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="my-3 flex justify-between text-sm">
            <input
              type="text"
              className="border rounded p-2 py-3 w-[49%]"
              placeholder="Phone"
              value={inputs.phone}
              name="phone"
              onChange={(e) => handleInputChange(e)}
            />
            <input
              type="text"
              className="border rounded p-2 py-3 w-[49%]"
              placeholder="City"
              value={inputs.city}
              name="city"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="email"
          className="border rounded p-2 py-3 w-full"
          placeholder="Email"
          value={inputs.email}
          name="email"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Password"
          value={inputs.password}
          name="password"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
    </div>
  );
};

export default AuthModalForm;
