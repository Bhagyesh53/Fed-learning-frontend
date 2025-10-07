import React, { useState } from "react";
import "./Dashboard.css";

export default function Dashboard({ user, onLogout }) {
  const [selectedFunc, setSelectedFunc] = useState("");

  const roleFunctions = {
    "Hospital Admins": ["Upload Bulk Patient Data (EHRs)", "Train Local Models", "Contribute Updates to Server", "Use Global Model for Diagnostics"],
    "Clinic Doctors": ["Upload Small Datasets", "Contribute Updates (Non-IID)", "Receive Global Model Updates"],
    "Diagnostic Labs": ["Upload Structured Test Data", "Train Specialized Local Models", "Contribute Features to Global Model"],
    "IoT Device Gateways": ["Provide Real-Time Sensor Data", "Train Lightweight Models", "Periodically Upload Updates"]
  };

  const handleUpload = () => {
    alert(`Simulated upload for function: ${selectedFunc}`);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-topbar">
        <h1>Dashboard</h1>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
      <div className="dashboard-main">
        <div className="sidebar">
          <h2>{user.role} Functions</h2>
          {roleFunctions[user.role]?.map((func) => (
            <button key={func} className={selectedFunc === func ? "active" : ""} onClick={() => setSelectedFunc(func)}>
              {func}
            </button>
          ))}
        </div>
        <div className="content">
          {selectedFunc ? (
            <div className="upload-card">
              <h2>{selectedFunc}</h2>
              <input type="file" />
              <button onClick={handleUpload}>Upload / Submit</button>
            </div>
          ) : (
            <p>Select a function from the left sidebar to begin.</p>
          )}
        </div>
      </div>
    </div>
  );
}
