import React, {useState} from 'react';
import ChatBox from './ChatBox';
import InputBox from './InputBox';
import Header from './Header';
import {vfInteract} from './VoiceflowInteractions';
import './App.css';

const useConversationState = (sessionSlug) => {
  const [messages, setMessages] = useState([]);
  const [choices, setChoices] = useState({});

  const addMessage = (message) => {
    // process received messages, adding choices to state,
    if (message.sender === 'response') {
      if (message.content.type === 'choice') {
        for (const button of message.content.payload?.buttons) {
          addChoice({[button.request.type]: {...button, handler: pressButton}});
        }
      }
    }
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const addChoice = (choice) => {
    setChoices((prevChoices) => ({...prevChoices, ...choice}));
  };

  const pressButton = (button) => {
    userSendAction(button.name, button.request);
  };

  // The choices a user can make from buttons or a choice step
  // Inside, they contain the button's name (.name), a handler (.handler)
  // and any other data that will be passed to the handler
  const userSendAction = (displayText, interactPayload) => {
    addMessage({sender: 'user', content: displayText});
    const VFAnswers = vfInteract(sessionSlug, interactPayload);

    VFAnswers.then((res) => {
      for (let i = 0; i < res.length; i++) {
        addMessage({sender: 'response', content: res[i]});
      }
    }, (err) => {
      console.log(err);
    });

    // clear choices
    setChoices({});
  };

  return {messages, choices, userSendAction, pressButton};
};

const ChatApp = () => {
  const [sessionSlug] = useState(() => {
    return Math.random().toString(36).substring(2, 15);
  });
  const {messages, choices, userSendAction, pressButton} =
    useConversationState(sessionSlug);

  return (
    <div className='app-wrapper'>
      <Header />
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
  );
};

export default ChatApp;
