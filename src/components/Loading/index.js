import React, { useRef, useState, useEffect } from 'react';
import './styles.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner} from '@fortawesome/free-solid-svg-icons';

export default function Loading() {

    return (
        <div className='loading-area'>
            <FontAwesomeIcon className='loader' icon= {faSpinner} /> 
        </div>
    )
}