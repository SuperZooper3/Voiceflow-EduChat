import {vfInteract} from './VoiceflowInteractions';
import React, {useState} from 'react';

const useConversationState = () => {
  const [messages, setMessages] = useState([]);
  const [choices, setChoices] = useState({});
  const [sessionSlug, setSessionSlug] = useState(() => {
    null;
  });

  // Set the initial sessionSlug
  React.useEffect(() => {
    if (!sessionSlug) {
      setSessionSlug(Math.random().toString(36).substring(2, 15));
    }
  }, []);

  // Launch the voiceflow conversation when sessionSlug changes
  React.useEffect(() => {
    if (sessionSlug) {
      userSendAction(null, {type: 'launch'});
      console.log('Conversation started');
      console.log(sessionSlug);
    }
  }, [sessionSlug]); // This effect runs whenever sessionSlug changes

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
    if (displayText !== null) {
      addMessage({sender: 'user', content: displayText});
    }
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

export default useConversationState;
