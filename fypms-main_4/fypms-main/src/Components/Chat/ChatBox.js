// components/ChatBox.js
import React from 'react';
import './chat.css'; // Import the CSS file

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-box">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.sender === 'Student' ? 'received' : 'sent'}`}
          style={{ backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#e0f7fa' }}
        >
          <p><strong>{message.sender}: </strong>{message.text}</p>
          <span className="time">{message.time}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
