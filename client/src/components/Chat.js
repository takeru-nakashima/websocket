import React, { useEffect, useRef, useState } from 'react'
import { Message } from './Message';
import { io } from 'socket.io-client';

export const Chat = (props) => {
    const {name} = props;
    const [messages, setMessages] = useState([{name: '管理人', text:`ようこそ、${name} さん`}])
    const [text, setText] = useState('');

    const handleInputChange = (e) => {
        setText(e.target.value)
    }

    const handleButtonClick = () => {
        const addMessage = {
            name: name,
            text: text
        };
        socketRef.current.emit('send', addMessage);
        setMessages(prevMessages => [...prevMessages, addMessage]);
        setText('');
    }

    const socketRef = useRef();

    useEffect(() => {
        console.log('Connecting ..');
        socketRef.current = io();
        socketRef.current.on('broadcast', payload => {
            console.log('Received: ' + payload);
            setMessages(prevMessages => [...prevMessages, payload]);
        })
        return () => {
            console.log('Disconnecting ..');
            socketRef.current.disconnect();
        }
    }, [])

  return (
    <div>
      <div className='input'>
        <input type="text" placeholder='メッセージ' value={text} onChange={handleInputChange} />
        <button disabled={!text} onClick={handleButtonClick}>送信</button>
      </div>

      <ul>
        {
            messages.map((message, index) => {
                return (
                    <Message key={index} name={message.name} text={message.text} />
                )
            })
        }
      </ul>
    </div>
  )
}
