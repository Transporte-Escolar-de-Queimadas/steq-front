import React, { useEffect } from 'react';
import './global.css';
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {

  useEffect(() => {
    document.title = "Sistema de Transporte Escolar de Queimadas"
  }, [])

  return (
    <>
      <AppRoutes />
      <ToastContainer/>
    </>
    
  );
}
export default App;
