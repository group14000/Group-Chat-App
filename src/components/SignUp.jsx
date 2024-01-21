import { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

const SignUp = () => {
  const url = "http://localhost:4000";
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${url}/api/user/signUp`, {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
    });
    alert(response.data.message);
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
              Sign Up
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                ref={nameRef}
                required
                className="mt-1 p-2 w-full border rounded-md text-sm"
              />
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
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="number"
                name="phone"
                ref={phoneRef}
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
              <LockIcon className="mr-2" />
              Sign Up
            </button>
            <div className="mt-4">
              <span>Already have an account? </span>
              <Link to="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default SignUp;
