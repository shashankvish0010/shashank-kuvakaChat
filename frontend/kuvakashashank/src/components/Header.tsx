import React from "react";

const Header: React.FC = () => {
  return (
    <div className="h-[10vh] w-screen bg-blue-600 text-white flex items-center justify-between px-4">
      <p className="font-semibold text-3xl">Group Chat</p>
    </div>
  );
};

export default Header;
