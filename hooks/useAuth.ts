import { AuthenticationContext } from "./../app/context/AuthContext";
import axios from "axios";
import React, { useContext } from "react";

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(AuthenticationContext);

  const signIn = async (email: string, password: string, handleClose: () => void) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });
      setAuthState({ data: response.data, error: null, loading: false });
      handleClose();
    } catch (error: any) {
      setAuthState({ data: null, error: error.response.data.errorMessage, loading: false });
    }
  };
  const signUp = async () => {};

  return { signIn, signUp };
};

export default useAuth;
