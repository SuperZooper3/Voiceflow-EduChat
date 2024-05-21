import React, {useState} from 'react';
import ChatBox from './ChatBox';
import InputBox from './InputBox';
import Header from './Header';
import Article from './Article';
import './App.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [sessionSlug] = useState(() => {
    return Math.random().toString(36).substring(2, 15);
  });

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className='app-wrapper'>
      <Header />
      <div className='body-wrapper'>
        <div className='body-half'>
          <Article />
        </div>
        <div className='body-half'>
          <div className='chat-wrapper'>
            <ChatBox messages={messages} />
            <InputBox addMessage={addMessage} userName={sessionSlug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
