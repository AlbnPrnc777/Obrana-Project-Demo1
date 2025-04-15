import { ethers } from "ethers";

// Sepolia Contract Address & ABI
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with actual address
const CONTRACT_ABI = [
  // Replace this with your actual contract ABI from Remix or Hardhat
];

export const getEthereumContract = () => {
  if (!window.ethereum) {
    alert("Metamask is not installed!");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) throw new Error("Install Metamask!");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0]; // Return connected wallet address
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
};
