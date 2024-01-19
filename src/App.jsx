import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Authentication/LoginForm";
import SignupForm from "./Authentication/SignupForm";
import Header from "./Chat/Header";
import ChatInterface from "./Chat/ChatInterface";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/chat" element={<ChatInterface />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
