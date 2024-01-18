import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Chat, PersonAdd, ExitToApp } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar position="static" className="bg-blue-500">
      <Toolbar className="justify-between">
        <Typography variant="h6" component="div">
          Chat App
        </Typography>

        <div className="flex space-x-4">
          <Link to="/chat">
            <IconButton color="inherit">
              <Chat />
            </IconButton>
          </Link>

          <Link to="/signup">
            <IconButton color="inherit">
              <PersonAdd />
            </IconButton>
          </Link>

          <Link to="/login">
            <IconButton color="inherit">
              <ExitToApp />
            </IconButton>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
