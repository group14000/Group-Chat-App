import { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log("Login submitted:", formData);
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
