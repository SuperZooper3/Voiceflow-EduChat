import React, {useState} from 'react';
import ChatBox from './ChatBox';
import InputBox from './InputBox';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div>
      <h1>Chat App</h1>
      <ChatBox messages={messages} />
      <InputBox addMessage={addMessage} />
    </div>
  );
};

export default ChatApp;
