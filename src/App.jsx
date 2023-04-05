import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateRoom from "./pages/CreateRoom";
import ChatRoom from "./pages/ChatRoom";
import authContext from "./auth-context";

const App = () => {
  const [userName, setUserName] = useState("");
  console.log(userName)
  
  return (
    <authContext.Provider value={{userName, setUserName}}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createroom" element={<CreateRoom />} />
        <Route path="/chatroom/:room" element={<ChatRoom />} />
      </Routes>
    </authContext.Provider>
  );
};

export default App;
