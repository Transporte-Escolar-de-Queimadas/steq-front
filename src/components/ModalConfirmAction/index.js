import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./styles.css";

import AlertIcon from "../../assets/AlertIcon.svg";
import CloseIcon from "../../assets/CloseIcon.svg";


const ModalConfirmAction = forwardRef(({ modalDescription, isOpen, closeModal, isDelete}) => {
  const navigate = useNavigate();


  return (
    <div className= {`modal-container ${isOpen ? 'open' : 'closed'}`}>
      <div className='modal' >
        <button className="modal-close-button" onClick={() => closeModal()}>
            <img src={CloseIcon} alt='Ícone de fechar' />
        </button>
        <div className="modal-box">
            <img className="alert-icon" src={AlertIcon} alt="Ícone de Alerta" />
            <div className="modal-text-area">
                <span className="modal-description">{modalDescription}</span>
            </div>
            <div className="modal-buttons">
            <button className="modal-cancel-button" onClick={() => closeModal()}>
                CANCELAR
            </button>
            <button className={`modal-confirm-button ${isDelete ? 'delete' : ''}`} onClick={() => console.log("confirmAction()")}>
                CONFIRMAR
            </button>
            </div>
        </div>      
      </div>
    </div>

    
  );
});

export default ModalConfirmAction;
