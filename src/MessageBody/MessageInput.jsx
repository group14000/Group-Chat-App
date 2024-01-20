import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const MessageInput = () => {
  // State for message input
  const [message, setMessage] = useState("");

  // Function to handle message input change
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Function to handle sending message
  const handleSend = () => {
    // Implement your logic for sending the message
    console.log("Message sent:", message);
  };

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-300 p-4">
      <div className="flex items-center">
        <TextField
          type="text"
          value={message}
          onChange={handleChange}
          style={{ flex: 1, marginRight: "10px" }}
          variant="outlined"
          size="small"
          label="Type your message"
        />
        <Button
          onClick={() => {
            handleSend();
            // Add your logic to update display state if needed
          }}
          style={{ padding: "5px 10px" }}
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
