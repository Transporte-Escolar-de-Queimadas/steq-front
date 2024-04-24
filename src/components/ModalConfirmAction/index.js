import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./styles.css";

import AlertIcon from "../../assets/AlertIcon.svg";
import CloseIcon from "../../assets/CloseIcon.svg";
import DeleteIcon from "../../assets/DeleteIcon.svg"

import { createRoute, editRoute, deleteRoute } from "../../service/routes_service";
import { createNotice, editNotice, deleteNotice } from "../../service/notices_service";


const ModalConfirmAction = forwardRef(({ modalDescription, isOpen, closeModal, isDelete, route, action, notice}) => {
  const navigate = useNavigate();

  function excludeNotice(){
    if(notice){
      deleteNotice(notice)
        .then( () => {
          toast.success("Aviso excluído com sucesso!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          navigate("/administrador/manage-notices");         
        })
        .catch(() => {
          toast.error("Erro ao excluir aviso.", {
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

  function updateNotice(){
    if(notice){
      editNotice(notice)
        .then( () => {
          toast.success("Aviso editado com sucesso!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          navigate("/administrador/manage-notices");         
        })
        .catch(() => {
          toast.error("Erro ao editar aviso.", {
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

  function createNewNotice() {
    if (notice) {
      createNotice(notice)
        .then(() => {
          toast.success("Aviso criado com sucesso!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/administrador/manage-notices");
        })
        .catch(() => {
          toast.error("Erro ao criar aviso.", {
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

  function excludeRoute(){
    if(route){
      deleteRoute(route)
        .then( () => {
          toast.success("Rota excluída com sucesso!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/administrador/manage-routes");         
        })
        .catch(() => {
          toast.error("Erro ao excluir rota.", {
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

  function updateRoute(){
    if(route){
      editRoute(route)
        .then( () => {
          toast.success("Rota editada com sucesso!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/administrador/manage-routes");         
        })
        .catch(() => {
          toast.error("Erro ao editar rota.", {
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
          navigate("/administrador/manage-routes");
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
      case "createRoute":
        createNewRoute();
        return;
      case "updateRoute":
        updateRoute();
        return;
      case "deleteRoute":
        excludeRoute();
        return;
      case "createNotice":
        createNewNotice();
        return;
      case "updateNotice":
        updateNotice();
        return;
      case "deleteNotice":
        excludeNotice();
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
