import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Authentication/LoginForm";
import SignupForm from "./Authentication/SignupForm";
import ChatPage from "./Chat/ChatPage";
import Navbar from "./Navbar/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
