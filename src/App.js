import React from 'react';
import ChatBox from './ChatBox';
import InputBox from './InputBox';
import Header from './Header';
import {Article, useArticleState} from './Article';

import useConversationState from './ConversationState';
import './App.css';

const ChatApp = () => {
  const {
    messages,
    choices,
    userSendAction,
    userUpdateVariables,
    isAwaitingResponse,
  } =
    useConversationState();

  const {article, handleArticleSelect} =
    useArticleState(userSendAction, userUpdateVariables);

  return (
    <div className='app-wrapper'>
      <Header handleArticleSelect={handleArticleSelect} />
      <div className='body-wrapper'>
        <div className='body-half'>
          <Article article={article} />
        </div>
        <div className='body-half'>
          <div className='chat-wrapper'>
            <ChatBox
              messages={messages}
              choices={choices}
              isAwaitingResponse={isAwaitingResponse}
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
