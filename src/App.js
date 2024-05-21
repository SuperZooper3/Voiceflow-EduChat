import React, {useState} from 'react';
import ChatBox from './ChatBox';
import InputBox from './InputBox';
import Header from './Header';
import {vfInteract} from './VoiceflowInteractions';
import './App.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  // The choices a user can make from buttons or a choice step
  const [choices, setChoices] = useState({});
  const [sessionSlug] = useState(() => {
    return Math.random().toString(36).substring(2, 15);
  });

  const addChoice = (choice) => {
    setChoices((prevChoices) => ({...prevChoices, ...choice}));
  };

  const addMessage = (message) => {
    // process received messages, adding choices to state,
    if (message.sender === 'response') {
      if (message.content.type === 'choice') {
        for (const button of message.content.payload?.buttons) {
          addChoice({[button.request.type]: button});
        }
      }
    }
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // FIXME: Refactor this function to centralise the button
  const pressButton = (button) => {
    addMessage({sender: 'user', content: button.name});
    const VFAnswers = vfInteract(sessionSlug, button.request);

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

  return (
    <div className='app-wrapper'>
      <Header />
      <ChatBox
        messages={messages}
        choices={choices}
        pressButton={pressButton}
      />
      <InputBox addMessage={addMessage} userName={sessionSlug} />
    </div>
  );
};

export default ChatApp;
