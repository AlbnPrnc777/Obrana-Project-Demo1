import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Logging out...");

    // Remove user session
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    // Force page reload to reset session state
    setTimeout(() => {
      window.location.href = "/login"; // Redirect to login
    }, 1000);
  }, []);

  return (
    <div className="logout">
      <h2>Logging Out...</h2>
      <p>Redirecting to the login page...</p>
    </div>
  );
};

export default Logout;
