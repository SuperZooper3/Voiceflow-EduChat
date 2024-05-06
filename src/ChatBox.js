import React from 'react';
import './ChatBox.css'; // Import CSS file for styling
import PropTypes from 'prop-types';

const prepMessageBody = (message) => {
  return (
    <div>
      {message.split('\n').map((line, i) => {
        return line ? <div className='messageLine' key={i}>{line}</div>: null;
      })}
    </div>
  );
};

const ChatBox = ({messages}) => {
  const boxRef = React.useRef(null);

  React.useEffect(() => {
    boxRef.current.scrollTo({
      top: boxRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  console.log(messages);
  return (
    <div className="chat-box" ref={boxRef}>
      {messages.map((message, index) => (
        <div
          className={`message ${message.type === 'user' ? 'sent' : 'recieved'}`}
          key={index}
        >
          {prepMessageBody(message.content)}
        </div>
      ))}
    </div>
  );
};

ChatBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
};


export default ChatBox;
