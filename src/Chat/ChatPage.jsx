// ChatPage.jsx

import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "John", text: "Hey there!" },
    { id: 2, sender: "Jane", text: "Hi John!" },
    // Add more messages as needed
  ]);

  const addMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar (Contact List) - You can add this component as needed */}
      {/* <Sidebar /> */}

      {/* Chat Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <ChatHeader />

        {/* Chat Messages */}
        <ChatMessages messages={messages} />

        {/* Chat Input */}
        <ChatInput onSendMessage={addMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
