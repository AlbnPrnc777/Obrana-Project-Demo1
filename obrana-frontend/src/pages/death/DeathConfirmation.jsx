import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../contract/ObranaConfig";
import "./death.scss";

const DeathConfirmation = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationCount, setConfirmationCount] = useState(0);
  const [guardianConfirmed, setGuardianConfirmed] = useState(false);

  const handleConfirmDeath = async () => {
    setStatus("");
    setLoading(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.confirmDeath();
      await tx.wait();

      setStatus("✅ Death has been confirmed on-chain.");
      await fetchGuardianStatus(); // 🔄 Refresh status after confirmation
    } catch (error) {
      console.error("Error confirming death:", error);
      setStatus("❌ Failed to confirm death. Check console for details.");
    }

    setLoading(false);
  };

  const fetchGuardianStatus = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const address = await signer.getAddress();
      const confirmed = await contract.deathConfirmations(address);
      const count = await contract.confirmationCount();

      setGuardianConfirmed(confirmed);
      setConfirmationCount(count.toNumber());
    } catch (err) {
      console.error("Error fetching guardian status:", err);
    }
  };

  useEffect(() => {
    fetchGuardianStatus();
  }, []);

  return (
    <div className="death">
      <Sidebar />
      <div className="deathContainer">
        <Navbar />
        <div className="content">
          <h2>Death Confirmation</h2>
          <p>Only a registered guardian can confirm the death of the asset owner.</p>
          <button className="confirmBtn" onClick={handleConfirmDeath} disabled={loading || guardianConfirmed}>
            {guardianConfirmed ? "Already Confirmed" : loading ? "Confirming..." : "Confirm Death"}
          </button>
          {status && <p className="status">{status}</p>}
          <div className="confirmationDetails">
            <p><strong>Total Confirmations:</strong> {confirmationCount}</p>
            {guardianConfirmed ? (
              <p className="confirmed">✅ You have confirmed the death.</p>
            ) : (
              <p className="pending">🕒 You have not confirmed the death yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeathConfirmation;
