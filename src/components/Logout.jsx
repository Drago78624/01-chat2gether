import { Button, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import authContext from "../auth-context";
import utilConfig from "../util-config";
import { FiLogOut } from "react-icons/fi";

const cookies = new Cookies();

const Logout = () => {
  const navigate = useNavigate();
  const authCtx = useContext(authContext);

  const onLogout = async () => {
    try {
      await signOut(auth);
      authCtx.setUserName("");
      cookies.remove("auth-token");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button onClick={onLogout} colorScheme={utilConfig.colorScheme}>
      <FiLogOut />
      <Text ml={2}>Logout</Text>
    </Button>
  );
};

export default Logout;
