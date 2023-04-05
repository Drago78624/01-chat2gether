import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

const AlertBox = (props) => {
  return (
    <Alert
      position="fixed"
      width={500}
      bottom={20}
      status={props.status}
      variant="solid"
    >
      <AlertIcon />
      Data uploaded to the server. Fire on!
    </Alert>
  );
};

export default AlertBox;
