import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Navbar from "../components/Navbar";
import { Box, Button, Flex, Heading, Input, VStack } from "@chakra-ui/react";
import utilConfig from "../util-config";

const cookies = new Cookies();

const CreateRoom = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get("auth-token")) {
      navigate("/");
    }
  }, []);

  const [roomName, setRoomName] = useState("");
  const inputRef = useRef();

  const createRoom = (e) => {
    e.preventDefault()
    const val = inputRef.current.value.trim();
    setRoomName(val);
    if (val !== "") {
      navigate(`/chatroom/${val}`);
    }
  };

  return (
    <>
      <Navbar />
      <Flex minHeight="90vh" justifyContent="center" alignItems="center">
        <Box minWidth="350px">
          <Heading size="lg" mb={10} textAlign="center">
            Create or Enter a Room
          </Heading>
          <form onSubmit={createRoom}>
            <VStack spacing={4}>
              <Input ref={inputRef} placeholder="Room Name" />
              <Button type="submit" colorScheme={utilConfig.colorScheme} width="full" onClick={createRoom}>
                Create or Enter
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default CreateRoom;
