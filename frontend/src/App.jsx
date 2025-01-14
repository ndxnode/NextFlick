import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/profile/ProfilePage";
import Login from "./components/auth/Login";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
