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
      await axios.post("http://localhost:5000/api/auth/signup", { email, password, role });
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
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
