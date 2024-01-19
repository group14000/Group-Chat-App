// Header.jsx
import { AppBar, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Chat, ExitToApp, Group } from "@mui/icons-material";

const Header = () => {
  return (
    <AppBar position="static" className="flex justify-between items-center p-4">
      <Typography variant="h6">Sharp Chat</Typography>
      <div className="flex space-x-4">
        <Link to="/chat">
          <IconButton color="inherit">
            <Chat />
          </IconButton>
        </Link>

        <Link to="/group/chat">
          <IconButton color="inherit">
            <Group />
          </IconButton>
        </Link>

        <Link to="/login">
          <IconButton color="inherit">
            <ExitToApp />
          </IconButton>
        </Link>
      </div>
    </AppBar>
  );
};

export default Header;
