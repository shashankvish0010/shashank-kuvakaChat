import React, { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const chatContext = useContext(ChatContext); //Created a centralised centre for all the methods, states to be shared with components, and app.
  const navigate = useNavigate(); //navigate instance used to navigate to different pages without reloading the page.

  return (
    //Home page developed to get username also a bit of herosection to display my name and few links.
    <div className="bg-blue-600 text-white min-h-screen h-max w-screen flex flex-col items-center justify-evenly gap-3 p-5">
      <div className="font-semibold flex flex-col justify-center items-center gap-5 p-3">
        <h2 className="logo text-3xl md:text-5xl">Kuvaka Chat App</h2>
        <p className="title text-center text-xl md:text-2xl">
          Designed & Developed by{" "}
          <span className="text-yellow-300">
            <a
              href="https://www.linkedin.com/in/shashank-vishwakarma-full-stack-developer/"
              target="blank"
            >
              Shashank Vishwakarma
            </a>
          </span>
        </p>
      </div>
      {/* Simple input box is used to take input and used a context state to store the name efficiently */}
      <div className="flex items-center justify-center">
        <div className="bg-slate-100 border-2 rounded-xl w-max h-max flex flex-col justify-evenly gap-5 p-5 shadow">
          <h1 className="text-2xl text-blue-600 text-center font-semibold">
            Please enter your name
          </h1>
          <span className="w-[100%] h-[0.2rem] bg-blue-600 rounded"></span>
          <span className="flex flex-col gap-1">
            <p className="text-base text-gray-600">Enter Name</p>
            <input
              className="text-black px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border-2 rounded"
              type="text"
              name="email"
              value={chatContext?.userName || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                chatContext?.setUserName(e.target.value)
              }
            />
          </span>
          <span className="w-[100%] gap-2 flex items-center justify-evenly">
            <p className="text-black">Want to check the actual code? </p>
            <span className="text-blue-600 cursor-pointer hover:font-medium">
              <a
                href="https://github.com/shashankvish0010/shashank-kuvakaChat"
                target="blank"
              >
                Github
              </a>
            </span>
          </span>
          <button
            onClick={() => {
              chatContext?.setUser();
              navigate("/chat/room");
            }}
            className="bg-blue-600 p-2 font-medium text-white rounded"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
