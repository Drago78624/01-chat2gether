import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import utilConfig from "../util-config";

const Message = (props) => {
  return (
    <Flex gap={2}>
      <Text fontWeight="bold" minWidth="max-content">{props.user}</Text> :{" "}
      <Text
        bgColor={`${utilConfig.colorScheme}.600`}
        borderRadius="md"
        padding={3}
      >
        {props.message}
      </Text>
    </Flex>
  );
};

export default Message;
