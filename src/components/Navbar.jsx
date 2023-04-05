import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <Box padding={5} shadow="2xl">
      <Container maxW="992px">
        <Flex justifyContent="space-between">
          <Heading>Chat2gether</Heading>
          <Logout />
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
