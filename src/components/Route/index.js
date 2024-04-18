import React, { useRef, useState, useEffect } from 'react';
import './styles.css';


export default function Route({route}) {
    console.log(JSON.parse(route.destinations));

    return (
        <div className='home-route-content'>
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