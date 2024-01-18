import { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Phone,
  Lock,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
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
    // Add your signup logic here
    console.log("Form submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-16 p-8 bg-white rounded-md shadow-md w-96"
    >
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        variant="outlined"
        className="mb-4"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
        value={formData.name}
        onChange={handleChange("name")}
      />

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
        label="Mobile Number"
        fullWidth
        margin="normal"
        variant="outlined"
        className="mb-4"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Phone />
            </InputAdornment>
          ),
        }}
        value={formData.mobile}
        onChange={handleChange("mobile")}
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
        Sign Up
      </Button>

      <div className="text-center">
        <Link to="/login" className="text-blue-500">
          Already have an account? Login
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;