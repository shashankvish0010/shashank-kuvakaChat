import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

interface ContextValue {
  message: messages[];
  alert: string;
  userName: string;
  setUserName: React.SetStateAction<string> | any;
  setMessage: React.SetStateAction<string> | any;
  sendMessages: (message: string) => void;
  setUser: () => void;
}

interface messages {
  data: string;
  sendername: string;
  sender: boolean;
}

export const ChatContext = createContext<ContextValue | null>(null);

export const ChatContextProvider = ({ children }: any) => {
  const [userName, setUserName] = useState<string>("");
  const [socketId, setSocketId] = useState<string>("");
  const [message, setMessage] = useState<messages[]>([
    {
      data: "",
      sendername: "You",
      sender: true,
    },
  ]);
  const [alert, setAlert] = useState<string>("");

  const connected = (socketId: string) => {
    setSocketId(socketId);
  };

  const setUser = () => {
    socket.emit("setname", userName, socketId);
  };

  const sendMessages = (message: string) => {
    if (message && message.trim()) {
      setMessage((prevMessage) => [
        ...prevMessage,
        { data: message, sendername: userName, sender: true },
      ]);
      socket.emit("sendMessages", message, socketId);
    }
  };

  const receiveMessages = (message: string, name: string) => {
    setMessage((prevMessage) => [
      ...prevMessage,
      { data: message, sendername: name, sender: false },
    ]);
  };

  const Alert = (alerts: string) => {
    setAlert(alerts);
  };

  useEffect(() => {
    socket.on("connected", connected);
    socket.on("receiveMessages", receiveMessages);
    socket.on("warning", Alert);

    return () => {
      socket.off("connected", connected);
      socket.off("receiveMessages", receiveMessages);
      socket.off("warning", Alert);
    };
  }, [socket]);

  const info: ContextValue = {
    message,
    alert,
    userName,
    setUserName,
    setUser,
    setMessage,
    sendMessages,
  };
  return <ChatContext.Provider value={info}> {children} </ChatContext.Provider>;
};
