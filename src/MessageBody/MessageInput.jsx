import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch("http://localhost:3001/api/save-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        console.log("Message sent:", message);
        // Add your logic to update display state if needed
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
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
          onClick={handleSend}
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
