import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateRoom from "./pages/CreateRoom";
import ChatRoom from "./pages/ChatRoom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createroom" element={<CreateRoom />} />
        <Route path="/chatroom/:room" element={<ChatRoom />} />
      </Routes>
    </>
  );
};

export default App;
