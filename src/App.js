import React, {useState} from 'react';
import ChatBox from './ChatBox';
import InputBox from './InputBox';
import Header from './Header';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [sessionSlug] = useState(() => {
    return Math.random().toString(36).substring(2, 15);
  });

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div>
      <Header />
      <ChatBox messages={messages} />
      <InputBox addMessage={addMessage} userName={sessionSlug}/>
    </div>
  );
};

export default ChatApp;
