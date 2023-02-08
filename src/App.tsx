import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
