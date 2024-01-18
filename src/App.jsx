import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Authentication/LoginForm";
import SignupForm from "./Authentication/SignupForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
