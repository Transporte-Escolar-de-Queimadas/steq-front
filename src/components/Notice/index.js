import React, { useRef, useState, useEffect } from 'react';
import './styles.css';


export default function Notice({notice}) {

    return (
        <div className='notice-content'>
            <span className ='notice-title-data'> {notice.titulo} - {notice.data} </span>  
            <span className='notice-description'> {notice.descricao}</span>
            
        </div> 
    )
}