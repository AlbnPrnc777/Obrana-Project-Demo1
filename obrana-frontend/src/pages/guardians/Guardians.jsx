import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./guardians.scss";

const API_BASE = "http://localhost:5010/api/guardians";

const Guardians = () => {
  const [guardians, setGuardians] = useState([]);
  const [form, setForm] = useState({
    walletAddress: "",
    fullName: "",
    relationship: "",
  });

  const fetchGuardians = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setGuardians(data);
    } catch (error) {
      console.error("Error fetching guardians:", error);
    }
  };

  const handleAddGuardian = async () => {
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add guardian");

      setForm({ walletAddress: "", fullName: "", relationship: "" });
      fetchGuardians();
    } catch (err) {
      console.error("Error adding guardian:", err);
    }
  };

  useEffect(() => {
    fetchGuardians();
  }, []);

  return (
    <div className="guardians">
      <Sidebar />
      <div className="guardiansContainer">
        <Navbar />
        <div className="header">
          <h1>My Guardians</h1>
          <div className="form-inline">
            <input
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Relationship (e.g., Lawyer)"
              value={form.relationship}
              onChange={(e) => setForm({ ...form, relationship: e.target.value })}
            />
            <input
              type="text"
              placeholder="Wallet Address"
              value={form.walletAddress}
              onChange={(e) => setForm({ ...form, walletAddress: e.target.value })}
            />
            <button onClick={handleAddGuardian}>Add Guardian</button>
          </div>
        </div>

        <table className="guardiansTable">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Relationship</th>
              <th>Wallet Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {guardians.map((g, i) => (
              <tr key={i}>
                <td>{g.fullName}</td>
                <td>{g.relationship}</td>
                <td>{g.walletAddress}</td>
                <td className="status active">{g.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Guardians;
