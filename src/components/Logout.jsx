import { Button } from "@chakra-ui/react";
import React from "react";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const Logout = () => {
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  
  return <Button onClick={onLogout}>Logout</Button>;
};

export default Logout;
