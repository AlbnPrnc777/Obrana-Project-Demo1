import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./beneficiaries.scss";

const API_BASE = "http://localhost:5010/api/assets"; // Make sure this matches your backend port

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await fetch(API_BASE);
        const data = await res.json();

        const mapped = [];

        data.forEach((asset) => {
          if (asset.primaryHeir) {
            mapped.push({
              address: asset.primaryHeir,
              assetName: asset.name,
              status: asset.transferred ? "Approved" : "Pending",
            });
          }

          if (asset.fallbackHeir) {
            mapped.push({
              address: asset.fallbackHeir,
              assetName: asset.name,
              status: asset.transferred ? "Approved" : "Pending",
            });
          }
        });

        // Group by address with assets
        const grouped = mapped.reduce((acc, curr) => {
          const existing = acc.find((b) => b.address === curr.address);
          if (existing) {
            existing.assets.push(curr.assetName);
          } else {
            acc.push({ ...curr, assets: [curr.assetName] });
          }
          return acc;
        }, []);

        setBeneficiaries(grouped);
      } catch (err) {
        console.error("Error loading beneficiaries:", err);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div className="beneficiaries">
      <Sidebar />
      <div className="beneficiariesContainer">
        <Navbar />
        <div className="header">
          <h1>My Beneficiaries</h1>
        </div>

        <table className="beneficiariesTable">
          <thead>
            <tr>
              <th>Wallet Address</th>
              <th>Assigned Asset(s)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaries.map((b, index) => (
              <tr key={index}>
                <td>{b.address}</td>
                <td>{b.assets.join(", ")}</td>
                <td className={`status ${b.status === "Approved" ? "active" : "pending"}`}>
                  {b.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Beneficiaries;
