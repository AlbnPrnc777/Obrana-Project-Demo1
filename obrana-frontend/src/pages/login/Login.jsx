import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = ({ setIsAuthenticated }) => {
  const [wallet, setWallet] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedWallet = localStorage.getItem("user");
    if (storedWallet) {
      setWallet(storedWallet);
      setIsAuthenticated(true); // Update authentication state
      console.log("User already logged in:", storedWallet);
    }
  }, [setIsAuthenticated]);

  const handleLogin = async () => {
    if (!window.ethereum) {
      alert("Metamask is not installed! Please install it and try again.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setWallet(accounts[0]);
        localStorage.setItem("user", accounts[0]); // Store in local storage
        setIsAuthenticated(true); // Update authentication state
        console.log("Wallet connected:", accounts[0]);
        navigate("/"); // Redirect to dashboard after login
      } else {
        alert("Wallet connection failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Error connecting wallet: " + error.message);
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <h2>Login to Obrana</h2>
        <button onClick={handleLogin} className="loginButton">
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Login;
