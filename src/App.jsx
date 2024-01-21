import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
