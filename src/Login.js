import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login({ switchToSignup, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Hospital Admins");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password, role });
      onLogin({ email, role: res.data.role, token: res.data.token });
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="split-container">
      <div className="left-card">
        <div className="form-wrapper">
          {error && <div className="popup error-popup"><p>{error}</p></div>}
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Hospital Admins</option>
            <option>Clinic Doctors</option>
            <option>Diagnostic Labs</option>
            <option>IoT Device Gateways</option>
          </select>
          <button onClick={handleLogin}>Sign In</button>
          <p className="small-text">
            Don’t have an account? <span className="link" onClick={switchToSignup}>Sign Up</span>
          </p>
        </div>
      </div>
      <div className="right-card">
        <h2>About Federated Learning</h2>
        <p>
          Federated Learning allows multiple hospitals, clinics, labs, and IoT devices to train shared AI models without sharing sensitive data.
        </p>
        <ul>
          <li>Hospitals and clinics train local models on their own data.</li>
          <li>Only model updates are shared—no raw data leaves the premises.</li>
          <li>Global updates improve diagnosis tools for everyone.</li>
          <li>Ensures privacy and compliance with regulations.</li>
          <li>Supports personalized healthcare and faster learning.</li>
        </ul>
      </div>
    </div>
  );
}
