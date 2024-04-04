import React from 'react';
import './ChatBox.css'; // Import CSS file for styling
import PropTypes from 'prop-types';

const ChatBox = ({messages}) => {
  return (
    <div className="chat-box">
      {messages.map((message, index) => (
        <div
          className={`message ${index % 2 === 0 ? 'sent' : 'recieved'}`}
          key={index}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

ChatBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
};


export default ChatBox;
