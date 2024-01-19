import { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to manage logout confirmation dialog visibility
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  // Handler function to update form data on input change
  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  // Handler function to toggle password visibility
  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  // Handler function to show logout confirmation dialog
  const handleLogoutConfirmation = () => {
    setShowLogoutConfirmation(true);
  };

  // Handler function to perform logout
  const handleLogout = () => {
    // TODO: Implement logout logic (clear token, reset state, etc.)
    setIsLoggedIn(false);
    setShowLogoutConfirmation(false);
  };

  // Handler function to submit login form
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a GET request to your backend for login
      const response = await axios.get("http://localhost:3001/user/login", {
        params: formData,
      });

      // Handle the response from the backend
      console.log("Login response:", response.data);

      // Display an alert for either successful login or login error
      alert(response.data.message);

      // TODO: Save the token in local storage or state for future requests

      // Set the login status to true
      setIsLoggedIn(true);
    } catch (error) {
      // Handle errors from the backend (e.g., display an error message)
      console.error("Login error:", error.response.data);

      // Display an alert for login error
      alert("Login failed. Please check your credentials.");
    }
  };

  // JSX structure for the component
  return (
    <div className="mx-auto mt-16 p-8 bg-white rounded-md shadow-md w-96">
      {isLoggedIn ? (
        <>
          {/* Display message when logged in */}
          <div className="mb-4 text-center">
            <p>You are logged in!</p>
          </div>
          {/* Button to initiate logout */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="mb-4"
            onClick={handleLogoutConfirmation}
          >
            Logout
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Input fields for email and password */}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            className="mb-4"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            value={formData.email}
            onChange={handleChange("email")}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            variant="outlined"
            type={formData.showPassword ? "text" : "password"}
            className="mb-4"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formData.password}
            onChange={handleChange("password")}
          />
          {/* Button to submit the form */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mb-4"
          >
            Login
          </Button>
          {/* New User link section (conditionally rendered) */}
          {!isLoggedIn && (
            <div className="text-center">
              <Link to="/signup" className="text-blue-500">
                New User? Sign Up
              </Link>
            </div>
          )}
        </form>
      )}

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={showLogoutConfirmation}
        onClose={() => setShowLogoutConfirmation(false)}
      >
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogoutConfirmation(false)}>
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginForm;
