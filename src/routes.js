import React from "react";
import { BrowserRouter, Routes, Outlet, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import Notices from "./pages/Notices";


export default function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/administrador" element={<Login />} />
          <Route path="/administrador/home" element={<AdminHome />} />
          <Route path="/avisos" element={<Notices />} />
        </Routes>
      </BrowserRouter>
    );
  }