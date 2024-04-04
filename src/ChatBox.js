import React from 'react';
import './ChatBox.css'; // Import CSS file for styling

const ChatBox = ({ messages }) => {
    return (
        <div className="chat-box">
            {messages.map((message, index) => (
                <div className={`message ${index % 2 === 0 ? "sent" : "recieved"}`} key={index}>
                    {message}
                </div>
            ))}
        </div>
    );
};

export default ChatBox;
