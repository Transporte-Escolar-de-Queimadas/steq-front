import React, { useRef, useState, useEffect } from 'react';
import './styles.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Notice({notice}) {
    const navigate = useNavigate();
    const location = useLocation();
    const handleEditNotice = () => {
        navigate("/administrador/editar-aviso", { state: notice});
    }

    return (
        <div className={`notice-content ${location.pathname.includes('administrador') ? 'admin' : ''}`} 
        onClick={ location.pathname.includes('administrador') ? () => handleEditNotice() : null}>
            <span className ='notice-title-data'> {notice.title}  </span>  
            <span className='notice-description'> {notice.description}</span>
            <div className='notice-data-area'>
                {
                    notice.edited ? (
                        <span> Editado em: </span>
                    ): (
                        <span > Publicado em: </span>
                    )
                }     
                <span> {notice.date}  </span>   
            </div>
            
        </div> 
    )
}