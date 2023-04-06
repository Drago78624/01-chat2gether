import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import Navbar from "../components/Navbar";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Message from "../components/Message";
import authContext from "../auth-context";
import AlertBox from "../components/AlertBox";
import { BiArrowBack } from "react-icons/bi";
import { Link as RouterLink } from "react-router-dom";
import utilConfig from "../util-config";
import { AiOutlineSend } from "react-icons/ai";
import ScrollingBox from "../components/ScrollingBox";

const cookies = new Cookies();

const ChatRoom = () => {
  const navigate = useNavigate();
  const [newMsg, setNewMsg] = useState("");
  const messagesCollectionRef = collection(db, "messages");
  const { room } = useParams();
  const [messages, setMessages] = useState([]);

  const authCtx = useContext(authContext);

  useEffect(() => {
    if (!cookies.get("auth-token")) {
      navigate("/");
      return;
    }
  }, []);

  const sendMsg = async (e) => {
    e.preventDefault();
    if (newMsg.trim() !== "") {
      await addDoc(messagesCollectionRef, {
        message_text: newMsg,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName || authCtx.userName,
        room: room,
      });
      setNewMsg("");
    }
  };

  useEffect(() => {
    const queryMsg = query(
      messagesCollectionRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMsg, (snapshot) => {
      let msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxW="992px" paddingTop={10}>
        <Button as={RouterLink} to="/createroom">
          <BiArrowBack />
          <Text ml="2">Back</Text>
        </Button>
      </Container>
      <Heading size="lg" my={10} textAlign="center">
        Room :{" "}
        <Text color={utilConfig.colorScheme} display="inline">
          {room}
        </Text>
      </Heading>
      <Flex minHeight="70vh" justifyContent="center" alignItems="center">
        <Container maxW="992px" padding={5} shadow="2xl">
          <ScrollingBox>
            <VStack py={5} align="left">
              {messages.map((message) => {
                return (
                  <Message
                    key={message.id}
                    user={message.user}
                    message={message.message_text}
                  />
                );
              })}
            </VStack>
          </ScrollingBox>
          <Box mt={5}>
            <form onSubmit={sendMsg}>
              <HStack>
                <Input
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  placeholder="Type a message..."
                />
                <Button type="submit" colorScheme={utilConfig.colorScheme}>
                  <AiOutlineSend />
                </Button>
              </HStack>
            </form>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default ChatRoom;
