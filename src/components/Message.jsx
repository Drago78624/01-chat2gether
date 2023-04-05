import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Message = (props) => {
  return (
    <Flex gap={2}>
      <Text>{props.user}</Text> : <Text>{props.message}</Text>
    </Flex>
  );
};

export default Message;
