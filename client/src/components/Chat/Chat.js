import React, { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

export const Chat = () => {

  // useNavigateで受信したデータを取得
  const location = useLocation();
  // useLocation()で値が取得できない際にはstateでエラーになる為null,undefined許容
  const name = location.state?.name ?? 'ゲスト';

  const [messages, setMessages] = useState([
    {
      name: "管理人",
      text: `ようこそ、${name} さん`,
      postAt: `現在時刻 ${new Date().toLocaleString("ja")}`,
    },
  ]);
  const [text, setText] = useState("");
  const [roomId, setRoomId]  = useState('');
  
  const socketRef = useRef();

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const postAt = new Date().toLocaleString("ja");
  const handleButtonClick = () => {
    const addMessage = {
      name: name,
      text: text,
      postAt: postAt,
    };
    socketRef.current.emit("send", addMessage);
    setMessages((prevMessages) => [...prevMessages, addMessage]);
    setText("");
  };


  useEffect(() => {
    console.log("Connecting ..");
    socketRef.current = io();
    socketRef.current.on("sendSpecificRoom", (payload) => {
      console.log("Received: " + payload);
      setMessages((prevMessages) => [...prevMessages, payload]);
    });
    return () => {
      console.log("Disconnecting ..");
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      <select onChange={(event) => {
        setRoomId(event.target.value);
        socketRef.current.emit('joinRoom', {roomId: event.target.value});
      }}>
        <option value="">---</option>
        <option value="room1">Room1</option>
        <option value="room2">Room2</option>
      </select>

      <div className="input">
        <input
          type="text"
          placeholder="メッセージ"
          value={text}
          onChange={handleInputChange}
        />
        <button disabled={!text} onClick={handleButtonClick}>
          送信
        </button>
      </div>

      <ul>
        {messages.map((message, index) => {
          return (
            <Message
              key={index}
              name={message.name}
              text={message.text}
              postAt={message.postAt}
            />
          );
        })}
      </ul>
    </div>
  );
};
