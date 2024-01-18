// ChatMessages.jsx

const ChatMessages = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <div className="font-bold">{message.sender}</div>
          <div className="bg-white rounded p-2">{message.text}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
