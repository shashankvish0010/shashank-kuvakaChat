import React, { useContext, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { Icon } from "@iconify/react";
import Header from "../components/Header";
import Alert from "../components/Alert";
import MessageBox from "../components/MessageBox";

const ChatRoom: React.FC = () => {
  // Main page where the logic is being executed
  const chatContext = useContext(ChatContext); //Created a centralised centre for all the methods, states to be shared
  const [myMessages, setMyMessages] = useState<string>(""); //State to store current users messages

  return (
    <div className="h-max min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <Header />

      {/* Alert Section - Only show if alert exists */}
      {chatContext?.alert && <Alert alert={chatContext?.alert} />}

      {/* Message Display Area */}
      <div className="bg-white flex-1 flex-col p-4 w-[90vw] gap-3 overflow-auto">
        {/* Message list would go here */}
        {chatContext?.message
          ? chatContext?.message.map((message) =>
              message?.data ? (
                message.sender === true ? (
                  <MessageBox
                    bgcolor="bg-blue-600"
                    textcolor="text-white"
                    margin="ml-auto"
                    user="You"
                    data={message.data}
                  />
                ) : (
                  <MessageBox
                    bgcolor="bg-white"
                    textcolor="text-black"
                    margin="mr-auto"
                    user={message.sendername}
                    data={message.data}
                  />
                )
              ) : null
            )
          : null}
      </div>

      {/* Chat Input Section */}
      <div className="bg-blue-600 h-[10vh] w-screen flex items-center justify-between px-4">
        {/* Input Field */}
        <div className="bg-slate-50 w-full md:w-[70vw] rounded-full p-1.5 flex items-center">
          <input
            className="w-full px-2 focus-visible:outline-none bg-white placeholder:text-black placeholder:font-semibold"
            type="text"
            placeholder="Send a Message..."
            value={myMessages || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMyMessages?.(e.target.value)
            }
          />
        </div>

        {/* Send Button */}
        <Icon
          onClick={() => chatContext?.sendMessages(myMessages)}
          className="cursor-pointer ml-4"
          icon="mingcute:send-fill"
          height="2rem"
          style={{ color: "yellow" }}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
