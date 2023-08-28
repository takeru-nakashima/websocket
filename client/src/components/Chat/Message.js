import React from "react";

export const Message = (props) => {
  const { name, text, postAt } = props;
  return (
    <div>
      <p>
        {name}:{text}
        <span className="Small-text">送信時刻：{postAt}</span>
      </p>
    </div>
  );
};
