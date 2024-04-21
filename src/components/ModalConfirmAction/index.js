import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./styles.css";

import AlertIcon from "../../assets/AlertIcon.svg";
import CloseIcon from "../../assets/CloseIcon.svg";
import DeleteIcon from "../../assets/DeleteIcon.svg"

import { createRoute } from "../../service/routes_service";


const ModalConfirmAction = forwardRef(({ modalDescription, isOpen, closeModal, isDelete, route, action}) => {
  const navigate = useNavigate();


  function createNewRoute() {
    if (route) {
      createRoute(route)
        .then(() => {
          toast.success("Rota criada com sucesso!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          navigate("/");
        })
        .catch(() => {
          toast.error("Erro ao criar rota.", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          closeModal();
        });
    }
  }

  function confirmAction() {
    switch (action) {
      case "create":
        createNewRoute();
        return;
      case "C":
        console.log("concludeRequirement()");
        return;
      case "N":
        console.log("createNewRequirement()");
        return;
      default:
        return;
    }
  }

  return (
    <div className= {`modal-container ${isOpen ? 'open' : 'closed'}`}>
      <div className='modal' >
        <button className="modal-close-button" onClick={() => closeModal()}>
            <img src={CloseIcon} alt='Ícone de fechar' />
        </button>
        <div className="modal-box">
            <img className="alert-icon" src={isDelete ? DeleteIcon : AlertIcon} alt="Ícone de Alerta" />
            <div className="modal-text-area">
                <span className="modal-description">{modalDescription}</span>
            </div>
            <div className="modal-buttons">
            <button className="modal-cancel-button" onClick={() => closeModal()}>
                CANCELAR
            </button>
            <button className={`modal-confirm-button ${isDelete ? 'delete' : ''}`} onClick={() => confirmAction()}>
                CONFIRMAR
            </button>
            </div>
        </div>      
      </div>
    </div>

    
  );
});

export default ModalConfirmAction;
