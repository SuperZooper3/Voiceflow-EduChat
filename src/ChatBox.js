import React from 'react';
import './ChatBox.css'; // Import CSS file for styling
import PropTypes from 'prop-types';

const prepMessageBody = (message) => {
  return (
    <div>
      {message.split('\n').map((line, i) => {
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
};

const ChatBox = ({messages}) => {
  console.log(messages);
  return (
    <div className="chat-box">
      {messages.map((message, index) => (
        <div
          className={`message ${index % 2 === 0 ? 'sent' : 'recieved'}`}
          key={index}
        >
          {prepMessageBody(message)}
        </div>
      ))}
    </div>
  );
};

ChatBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
};


export default ChatBox;
