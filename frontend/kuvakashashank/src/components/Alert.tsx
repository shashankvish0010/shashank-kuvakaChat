import React from "react";

interface alert {
  alert: string;
}

const Alert: React.FC<alert> = (props) => {
  return (
    <div className="bg-blue-600 w-max p-2 rounded-md mx-4 my-2">
      <p className="text-white font-medium">{props.alert}</p>
    </div>
  );
};

export default Alert;
