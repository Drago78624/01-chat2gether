import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import Logout from "./Logout";
import ToggleDarkModeBtn from "./ToggleDarkModeBtn";

const Navbar = () => {
  return (
    <Box padding={5} shadow="2xl">
      <Container maxW="992px">
        <Flex justifyContent="space-between">
          <Heading>Chat2gether</Heading>
          <HStack>
            <ToggleDarkModeBtn />
            <Logout />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
