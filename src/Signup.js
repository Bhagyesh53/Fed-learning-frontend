import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Signup({ switchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Hospital Admins");
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState("");

  const ALLOWED_ROLES = ["Hospital Admins", "Clinic Doctors", "Diagnostic Labs", "IoT Device Gateways"];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignup = async () => {
    if (!email || !password || !role) {
      setError("All fields are required");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (!ALLOWED_ROLES.includes(role)) {
      setError("Invalid role selected");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      await axios.post(
        "https://fed-learning-backend.onrender.com/api/auth/signup",
        { email, password, role }
      );
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
        switchToLogin();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="split-container">
      <div className="left-card">
        <div className="form-wrapper">
          {popup && <div className="popup"><p>Account created successfully! Redirecting to Sign In...</p></div>}
          {error && <div className="popup error-popup"><p>{error}</p></div>}

          <h1>Create Account</h1>
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
            {ALLOWED_ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
          <button onClick={handleSignup}>Sign Up</button>
          <p className="small-text">
            Already have an account? <span className="link" onClick={switchToLogin}>Sign In</span>
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
