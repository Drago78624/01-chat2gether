import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

const AlertBox = ({config}) => {
  return (
    <Alert
      position="fixed"
      width={500}
      bottom={20}
      status={config.status}
      variant="solid"
    >
      <AlertIcon />
      {config.text}
    </Alert>
  );
};

export default AlertBox;
