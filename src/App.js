import React, { useEffect } from 'react';
import './global.css';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AppProvider from "./contexts";


function App() {

  useEffect(() => {
    document.title = "Sistema de Transporte Escolar de Queimadas"
  }, [])

  return (
    <AppProvider>
      <AppRoutes />
      <ToastContainer/>
    </AppProvider>  
  );
}
export default App;
