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

import cookies from "./utils/cookies";

const PrivateWrapper = ({ }) => {
  let isAuthenticated = cookies.getCookie("@steq/token");
  return isAuthenticated ? <Outlet /> : <Navigate to="administrador" />;
};

export default function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/avisos" element={<Notices />} />
          <Route path="/administrador" element={<Login />} />
          <Route element = {<PrivateWrapper />}>
            <Route path="/administrador/home" element={<AdminHome />} />
          </Route>
          <Route element = {<PrivateWrapper />}>
            <Route path="/administrador/rotas" element={<ManageRoutes />} />
          </Route>          
          <Route element = {<PrivateWrapper />}>
            <Route path="/administrador/avisos" element={<ManageNotices />} />
          </Route> 
          <Route element = {<PrivateWrapper />}>
            <Route path="/administrador/nova-rota" element={<NewRoute/>} />
          </Route>                     
          <Route element = {<PrivateWrapper />}>
            <Route path="/administrador/editar-rota" element={<EditRoute/>} />
          </Route>       
          <Route element = {<PrivateWrapper />}>
            <Route path="/administrador/novo-aviso" element={<NewNotice/>} />
          </Route>    
          <Route element = {<PrivateWrapper />}>
            <Route path="/administrador/editar-aviso" element={<EditNotice/>} />
          </Route>            
        </Routes>
      </BrowserRouter>
    );
  }