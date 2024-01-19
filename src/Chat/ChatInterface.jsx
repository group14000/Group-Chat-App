import { useState } from "react";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { user: "User1", text: "Hi" },
    { user: "User2", text: "Hello" },
  ]);

  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      setMessages([...messages, { user: "User1", text: messageInput }]);
      setMessageInput("");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        className="mr-2 w-60 p-2 border border-gray-300 rounded"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInterface;
