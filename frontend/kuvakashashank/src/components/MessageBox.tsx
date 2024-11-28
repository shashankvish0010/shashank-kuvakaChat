import React from "react";

// interface for MessageBox
interface messagebox {
  bgcolor: string;
  textcolor: string;
  margin: string;
  user: string;
  data: string;
}

const MessageBox: React.FC<messagebox> = (props) => {
  return (
    <div
      className={`${props.bgcolor} ${props.textcolor} md:min-w-min border-2 border-gray-100 md:max-w-[50vw] w-max p-2 rounded-lg ${props.margin}-auto`}
    >
      <span>
        <p className="text-xs font-normal">{props.user}</p>
      </span>
      <p className="text-lg">{props.data}</p>
    </div>
  );
};

export default MessageBox;
