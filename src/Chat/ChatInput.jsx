// ChatInput.jsx

import { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage({ id: Date.now(), sender: "You", text: message });
      setMessage("");
    }
  };

  return (
    <div className="p-4 bg-gray-200">
      <div className="flex">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 resize-none rounded-md border border-gray-300 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
