import React, { useRef, useState, useEffect } from 'react';
import './styles.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Route({route}) {
    const navigate = useNavigate();
    const location = useLocation();
    const handleEditRoute = () => {
        navigate("/administrador/editar-rota", { state: route});
    }
    return (
        <div className={`home-route-content ${location.pathname.includes('administrador') ? 'admin' : ''}`} 
        onClick={ location.pathname.includes('administrador') ? () => handleEditRoute() : null}>
            <span className='home-route-boarding-place'> {route.embarkation_place}  </span> 
            <span>  {route.embarkation_time} </span>  
            <div className='home-route-destinations'>
                { 
                (() => {
                    try {
                    const destinationsArray = JSON.parse(route.destinations);
                    if (Array.isArray(destinationsArray)) {
                        return destinationsArray.map(destination => (
                        <span key={destination}> {destination}</span>
                        ));
                    } else {
                        return null; 
                    }
                    } catch (error) {           
                    return null; 
                    }
                })()
                 }
            </div>
        </div> 
    )
}