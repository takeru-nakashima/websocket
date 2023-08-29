import React from "react";

export const Message = (props) => {
  const { name, text, postAt, roomId } = props;
  return (
    <div>
      <p>
        {roomId}：{name}:{text}
        <span className="Small-text">送信時刻：{postAt}</span>
      </p>
    </div>
  );
};
