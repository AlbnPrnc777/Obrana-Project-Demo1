// src/pages/assets/Assets.jsx
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../contract/ObranaConfig";
import "./assets.scss";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5010/api/assets";

const Assets = () => {
  const [showForm, setShowForm] = useState(false);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    tokenAddress: "",
    tokenId: "",
    isERC721: false,
    primaryHeir: "",
    fallbackHeir: "",
    unlockTime: "",
    minHeirAge: "",
    heirBirthdate: "",
    category: ""
  });

  const fetchAssets = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setAssets(data);
    } catch (err) {
      console.error("Error fetching assets:", err);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleRegisterAsset = async () => {
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // On-chain registration
      const tx = await contract.registerAsset(
        formValues.name,
        formValues.tokenAddress,
        formValues.tokenId,
        formValues.isERC721,
        formValues.primaryHeir,
        formValues.fallbackHeir,
        formValues.unlockTime,
        formValues.minHeirAge,
        formValues.heirBirthdate
      );
      await tx.wait();

      // Off-chain MongoDB save
      await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues)
      });

      alert("Asset registered successfully!");
      setShowForm(false);
      setFormValues({
        name: "",
        tokenAddress: "",
        tokenId: "",
        isERC721: false,
        primaryHeir: "",
        fallbackHeir: "",
        unlockTime: "",
        minHeirAge: "",
        heirBirthdate: "",
        category: ""
      });
      fetchAssets();
    } catch (error) {
      console.error("Error registering asset:", error);
      alert("Something went wrong. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = !formValues.name || !formValues.tokenAddress || !formValues.tokenId || !formValues.primaryHeir || !formValues.unlockTime || !formValues.heirBirthdate || loading;

  return (
    <div className="assets">
      <Sidebar />
      <div className="assetsContainer">
        <Navbar />
        <div className="header">
          <h1>My Crypto Assets</h1>
          <button className="addAsset" onClick={() => setShowForm(true)}>
            + Add Asset
          </button>
        </div>

        {showForm && (
          <div className="formModal">
            <h3>Add Asset</h3>
            <input type="text" placeholder="Asset Name" value={formValues.name} onChange={e => setFormValues({ ...formValues, name: e.target.value })} />
            <input type="text" placeholder="Token Address" value={formValues.tokenAddress} onChange={e => setFormValues({ ...formValues, tokenAddress: e.target.value })} />
            <input type="text" placeholder="Token ID or Amount" value={formValues.tokenId} onChange={e => setFormValues({ ...formValues, tokenId: e.target.value })} />
            <label>
              <input type="checkbox" checked={formValues.isERC721} onChange={e => setFormValues({ ...formValues, isERC721: e.target.checked })} /> Is ERC721 (NFT)?
            </label>
            <input type="text" placeholder="Primary Heir Address" value={formValues.primaryHeir} onChange={e => setFormValues({ ...formValues, primaryHeir: e.target.value })} />
            <input type="text" placeholder="Fallback Heir Address" value={formValues.fallbackHeir} onChange={e => setFormValues({ ...formValues, fallbackHeir: e.target.value })} />
            <label>Unlock Time</label>
            <input type="datetime-local" onChange={e => {
              const timestamp = Math.floor(new Date(e.target.value).getTime() / 1000);
              setFormValues({ ...formValues, unlockTime: timestamp });
            }} />
            <input type="number" placeholder="Min Heir Age" value={formValues.minHeirAge} onChange={e => setFormValues({ ...formValues, minHeirAge: e.target.value })} />
            <label>Heir Birthdate</label>
            <input type="date" onChange={e => {
              const birthTimestamp = Math.floor(new Date(e.target.value).getTime() / 1000);
              setFormValues({ ...formValues, heirBirthdate: birthTimestamp });
            }} />
            <select value={formValues.category} onChange={e => setFormValues({ ...formValues, category: e.target.value })}>
              <option value="">Select Category</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Car">Car</option>
              <option value="NFT">NFT</option>
              <option value="Crypto">Crypto</option>
              <option value="Bank Account">Bank Account</option>
              <option value="Other">Other</option>
            </select>
            <button onClick={handleRegisterAsset} disabled={isSubmitDisabled}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        )}

        <table className="assetsTable">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Beneficiary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, i) => (
              <tr key={i}>
                <td>{asset.name}</td>
                <td>{asset.tokenId}</td>
                <td>{asset.category}</td>
                <td>{asset.primaryHeir}</td>
                <td className={asset.transferred ? "status active" : "status pending"}>
                  {asset.transferred ? "Secured" : "Pending Approval"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assets;
