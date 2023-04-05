import { createContext } from "react";

const authContext = createContext({
    userName: "",
    setUserName: () => {}
})

export default authContext