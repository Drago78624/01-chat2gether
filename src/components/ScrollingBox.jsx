import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

const ScrollingBox = ({ children }) => {
  const boxRef = useRef();

  useEffect(() => {
    const box = boxRef.current;
    box.scrollTop = box.scrollHeight;
  }, [children]);

  return (
    <Box
      ref={boxRef}
      h="600px"
      overflowY="scroll"
      p={2}
    >
      {children}
    </Box>
  );
}

export default ScrollingBox