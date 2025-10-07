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
      const res = await axios.post(
        "https://fed-learning-backend.onrender.com/api/auth/login",
        { email, password, role }
      );
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
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
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
          Federated Learning is a <strong>privacy-preserving AI approach</strong> that allows multiple hospitals, clinics, labs, 
          and IoT devices to collaboratively train a shared machine learning model without sharing sensitive patient data.
        </p>
        <ul>
          <li>🩺 Hospitals and clinics train local models on their own patient data.</li>
          <li>💾 Only model updates are shared with a central server—no raw data leaves the premises.</li>
          <li>📊 Global model updates are sent back, improving diagnosis and predictive tools for everyone.</li>
          <li>🔒 Ensures <strong>data privacy</strong> and compliance with medical data regulations.</li>
          <li>⚡ Supports personalized healthcare with faster, decentralized learning.</li>
          <li>📈 Non-IID data simulation ensures models learn from diverse populations.</li>
          <li>🔧 Scalable: works with hospitals, clinics, labs, and even IoT devices like wearables.</li>
        </ul>
        <p>
          This approach strengthens global AI models while respecting local patient data privacy, 
          making healthcare smarter and safer for everyone.
        </p>
      </div>
    </div>
  );
}
