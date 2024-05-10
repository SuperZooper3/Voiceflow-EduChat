import React from 'react';
import './ChatBox.css'; // Import CSS file for styling
import PropTypes from 'prop-types';

const prepMessageSent = (message) => {
  return (
    <div>
      {message.split('\n').map((line, i) => {
        return line ? <div className='messageLine' key={i}>{line}</div>: null;
      })}
    </div>
  );
};

const prepMessageRecieved = (trace) => {
  if (trace.type === 'text') {
    return (
      <div>
        {trace.payload.message.split('\n').map((line, i) => {
          return line ? <div className='messageLine' key={i}>{line}</div>: null;
        })}
      </div>
    );
  } else if (trace.type === 'image') {
    return (
      <img src={trace.payload.url} alt="VF Image" />
    );
  } else if (trace.type === 'path') {
    return;
  } else {
    return (
      <div>
        {JSON.stringify(trace)}
      </div>
    );
  }
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
        message.sender === 'user' ? (
          <div className="message sent" key={index}>
            {prepMessageSent(message.content)}
          </div>
        ) : (
          <div className="message recieved" key={index}>
            {prepMessageRecieved(message.content)}
          </div>
        )
      ))}
    </div>
  );
};

ChatBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string),
};

export default ChatBox;
