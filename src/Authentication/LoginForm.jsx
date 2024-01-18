import { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

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
    } catch (error) {
      // Handle errors from the backend (e.g., display an error message)
      console.error("Login error:", error.response.data);

      // Display an alert for login error
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-16 p-8 bg-white rounded-md shadow-md w-96"
    >
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

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className="mb-4"
      >
        Login
      </Button>

      <div className="text-center">
        <Link to="/signup" className="text-blue-500">
          New User? Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
