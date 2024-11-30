import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import AdminDashBoard from "./Admin/AdminDashBoard";
import Profile from "./Profile/Profile";

const App = () => {
  const location = useLocation();
  const noHeaderRoutes = ["/login", "/register", "/dashboard"];
  const showHeader = !noHeaderRoutes.includes(location.pathname);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`App ${showHeader ? "with-header" : ""}`}>
      {showHeader && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <Home isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminDashBoard
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
