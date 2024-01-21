import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const Login = () => {
  const navigate = useNavigate();
  const url = "http://localhost:4000";
  const emailRef = useRef();
  const passwordRef = useRef();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${url}/api/user/login`, {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    alert(response.data.message);
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      navigate("/welcome");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="sign-up">
        <header className="text-center text-2xl font-bold mb-4">
          Welcome To Chat
        </header>
        <main className="sign-up-main">
          <form onSubmit={submitHandler} className="sign-up-main-form">
            <div className="sign-up-main-form-heading text-xl font-bold mb-4">
              Log In
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                required
                className="mt-1 p-2 w-full border rounded-md text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                ref={passwordRef}
                required
                className="mt-1 p-2 w-full border rounded-md text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <LockOpenIcon className="mr-2" />
              Log In
            </button>
            <div className="mt-4">
              <span>Don't have an account? </span>
              <Link to="/" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
