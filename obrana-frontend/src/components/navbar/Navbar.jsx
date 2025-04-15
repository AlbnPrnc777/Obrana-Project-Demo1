import "./navbar.scss";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { ethers } from "ethers";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [walletAddress, setWalletAddress] = useState("");

  // Fetch wallet address from localStorage on component mount
  useEffect(() => {
    const storedWallet = localStorage.getItem("user");
    if (storedWallet) {
      setWalletAddress(storedWallet);
    }
  }, []);

  // Function to connect wallet (only if needed)
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setWalletAddress(address);
        localStorage.setItem("user", address); // Persist wallet address
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install Metamask!");
    }
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            {walletAddress ? (
              <span className="walletAddress">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            ) : (
              <button className="connectWallet" onClick={connectWallet}>
                <WalletOutlinedIcon className="icon" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
