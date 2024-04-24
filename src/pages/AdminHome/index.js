import { useState } from 'react';
import './styles.css';

import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleManageRoutes = () => {
      navigate('/administrador/rotas');
    };

    const handleManageNotices = () => {
      navigate('/administrador/avisos');
    };

    const handleLogout = () => {
      navigate('/administrador');
    };

    return (
      <div className='admin-home-container'> 
        <h1 className='admin-home-title'> Transporte Escolar de Queimadas</h1>
        <div className="admin-home-content">
          <div className="admin-home-buttons-area">
            <button 
              className='main-admin-home-button'
              onClick={handleManageRoutes}>  
              GERENCIAR ROTAS
            </button> 

            <button  
              className='main-admin-home-button'
              onClick={handleManageNotices}>  
              GERENCIAR AVISOS
            </button>          
          </div>

          <div className='admin-home-logout-area'>
            <button  
                className='secondary-admin-home-button'
                onClick={handleLogout}>  
                DESLOGAR
            </button>
          </div>      
                        
        </div>   



      </div>
    );
  }

  export default Home;