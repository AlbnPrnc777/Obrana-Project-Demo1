import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Assets from "./pages/assets/Assets";
import Beneficiaries from "./pages/beneficiaries/Beneficiaries";
import Guardians from "./pages/guardians/Guardians";
import Logs from "./pages/logs/Logs";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import DeathConfirmation from "./pages/death/DeathConfirmation";
import Logout from "./pages/logout/Logout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  
  // Track authentication status dynamically
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem("user"));
    };

    window.addEventListener("storage", handleAuthChange);
    return () => window.removeEventListener("storage", handleAuthChange);
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          {/* Redirect if not authenticated */}
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="assets" element={isAuthenticated ? <Assets /> : <Navigate to="/login" />} />
          <Route path="beneficiaries" element={isAuthenticated ? <Beneficiaries /> : <Navigate to="/login" />} />
          <Route path="guardians" element={isAuthenticated ? <Guardians /> : <Navigate to="/login" />} />
          <Route path="death-confirmation" element={isAuthenticated ? <DeathConfirmation /> : <Navigate to="/login" />} />
          <Route path="logs" element={isAuthenticated ? <Logs /> : <Navigate to="/login" />} />
          <Route path="profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
          <Route path="logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
