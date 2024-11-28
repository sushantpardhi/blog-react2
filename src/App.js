import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import AdminDashBoard from "./Admin/AdminDashBoard";

const App = () => {
  const location = useLocation();
  const noHeaderRoutes = ["/login", "/register"];
  const showHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <div className="App">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<AdminDashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
