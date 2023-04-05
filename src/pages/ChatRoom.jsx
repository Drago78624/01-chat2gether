import { Box, Button, Container, Flex, HStack, Heading, Input, VStack } from "@chakra-ui/react";
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

const cookies = new Cookies();

const ChatRoom = () => {
  const navigate = useNavigate();
  const [newMsg, setNewMsg] = useState("");
  const messagesCollectionRef = collection(db, "messages");
  const { room } = useParams();
  const [messages, setMessages] = useState([]);

  const authCtx = useContext(authContext)

  useEffect(() => {
    if (!cookies.get("auth-token")) {
      navigate("/");
      return
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
      console.log("new msg");
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
      <Flex minHeight="90vh" justifyContent="center" alignItems="center">
        <Container>
          <Heading size="lg" mb={10} textAlign="center">
            Room : {room}
          </Heading>
          <Box overflowY="scroll" maxH="400px">
          <VStack py={5} align="left">
            {messages.map((message) => {
              return (
                <Message key={message.id} user={message.user} message={message.message_text} />
              );
            })}
          </VStack>
          </Box>
          <form onSubmit={sendMsg}>
            <HStack>
              <Input
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Type a message..."
              />
              <Button type="submit">
                Send
              </Button>
            </HStack>
          </form>
          <AlertBox status="info" text />
        </Container>
      </Flex>
    </>
  );
};

export default ChatRoom;
