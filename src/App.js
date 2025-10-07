import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import "./Login.css";
import "./Dashboard.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.body.className = "";
    if (page === "login" || page === "signup") document.body.classList.add("login-signup");
    if (page === "dashboard") document.body.classList.add("dashboard");
  }, [page]);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  return (
    <>
      {page === "login" && <Login switchToSignup={() => setPage("signup")} onLogin={handleLogin} />}
      {page === "signup" && <Signup switchToLogin={() => setPage("login")} />}
      {page === "dashboard" && <Dashboard user={user} onLogout={handleLogout} />}
    </>
  );
}

export default App;
