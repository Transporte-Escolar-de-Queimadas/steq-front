import React, { useRef, useState, useEffect } from 'react';
import './styles.css';


export default function Notice({notice}) {

    return (
        <div className='notice-content'>
            <span className ='notice-title-data'> {notice.titulo}  </span>  
            <span className='notice-description'> {notice.descricao}</span>
            <div className='notice-data-area'>
                <span > Publicado em: </span>
                <span> {notice.data}  </span>   
            </div>
            
        </div> 
    )
}