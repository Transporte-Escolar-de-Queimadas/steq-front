import React, { useRef, useState, useEffect } from 'react';
import './styles.css';


export default function Route({route}) {

    return (
        <div className='home-route-content'>
            <span> {route.localPartida}  </span> 
            <span>  {route.horarioSaida} </span>  
            <div className='home-route-destinations'>
                {route.destinos.map(destino => (
                    <span key={destino}> {destino}</span>
                 ))}
            </div>
        </div> 
    )
}