import React from "react";
import { BrowserRouter, Routes, Outlet, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import Notices from "./pages/Notices";
import ManageRoutes from "./pages/ManageRoutes";
import ManageNotices from "./pages/ManageNotices";
import NewRoute from "./pages/NewRoute";
import EditRoute from "./pages/EditRoute";
import NewNotice from "./pages/NewNotice"
import EditNotice from "./pages/EditNotice"


export default function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/avisos" element={<Notices />} />
          <Route path="/administrador" element={<Login />} />
          <Route path="/administrador/home" element={<AdminHome />} />
          <Route path="/administrador/rotas" element={<ManageRoutes />} />
          <Route path="/administrador/avisos" element={<ManageNotices />} />
          <Route path="/administrador/nova-rota" element={<NewRoute/>} />
          <Route path="/administrador/editar-rota" element={<EditRoute/>} />
          <Route path="/administrador/novo-aviso" element={<NewNotice/>} />
          <Route path="/administrador/editar-aviso" element={<EditNotice/>} />
        </Routes>
      </BrowserRouter>
    );
  }