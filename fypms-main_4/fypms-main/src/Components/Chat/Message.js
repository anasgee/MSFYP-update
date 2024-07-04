// components/Message.js
import React, { useState ,useEffect} from 'react';
import "./chat.css";
import ChatBox from './ChatBox';
import MessageInput from './ChatInput';

const Message = (props) => {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (message, sender) => {
    const newMessage = {
      sender: sender,
      text: message,
      time: new Date().toLocaleTimeString()
    };
    setMessages([...messages, newMessage]);
  };


  // useEffect(()=>{
  //   axios.get(`${BASE_URL}/message`)
  //   .then(response => {
  //     setMessages(response.data);
  //   })

  //   .catch(error => {
  //     console.error('There was an error fetching the messages!', error);
  //   });
  // },[])
  return (
    <div className="chat-page">
      <h1>Teacher-Student Chat</h1>
      <ChatBox messages={messages} />
      <MessageInput onSend={handleNewMessage} senderName={props.userName} />
    </div>
  );
};

export default Message;
