import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import {FaMoon, FaSun} from "react-icons/fa"

const ToggleDarkModeBtn = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode}>
      {colorMode === "light" ? <FaMoon fontSize={18} /> : <FaSun fontSize={18} />}
    </Button>
  );
};

export default ToggleDarkModeBtn;
