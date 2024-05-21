import React from 'react';
import ChatBox from './ChatBox';
import InputBox from './InputBox';
import Header from './Header';
import Article from './Article';

import useConversationState from './ConversationState';
import './App.css';

const ChatApp = () => {
  const {messages, choices, userSendAction, pressButton} =
    useConversationState();

  return (
    <div className='app-wrapper'>
      <Header />
      <div className='body-wrapper'>
        <div className='body-half'>
          <Article />
        </div>
        <div className='body-half'>
          <div className='chat-wrapper'>
            <ChatBox
              messages={messages}
              choices={choices}
              pressButton={pressButton}
              userSendAction={userSendAction}
            />
            <InputBox
              userSendAction={userSendAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
