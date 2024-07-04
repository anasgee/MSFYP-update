// components/ChatInput.js
import React, { useState } from 'react';
import {BASE_URL} from "../../Constants.js"
import "./chat.css"

const ChatInput = ({ onSend,senderName }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async() => {
// let responseData;
//     await fetch(`{BASE_URL}/message`, {
//       method:"POST",
//       headers:{
//         Accept:"application/json",
//         "Content-Type":"application/json",
      
//       },
//     }).then((response)=>response.json()).then((data)=>responseData=data);

    if (message.trim() !== '') {
      onSend(message, senderName); // For simplicity, assuming sender is 'student'
      setMessage('');
      // console.log(senderName)
    }

    


  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
      />
      <button className='button' onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
