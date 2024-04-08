import { useState } from 'react';
import './styles.css';
import  Notice  from "../../components/Notice";
import { useNavigate } from 'react-router-dom';
import BackIcon from "../../assets/BackIcon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle, faCirclePlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import ModalConfirmAction from '../../components/ModalConfirmAction';

function EditRoute() {
  const [requirementSearchActive, setRequirementSearchActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('Já vai ter conteúdo');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [isDelete, setIsDelete] = useState();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleEditRoute = () => {
    // Lógica para editar a rota
    setModalDescription("Tem certeza que deseja editar essa rota?");
    setIsDelete(false);
    openModal(); // Abre o modal após editar a rota
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteRoute = () => {
    // Lógica para excluir a rota
    setModalDescription("Tem certeza que deseja excluir essa rota?");
    setIsDelete(true);
    openModal(); // Abre o modal após excluir a rota  
  };

  function goBackToPreviousPage() {
    navigate("/administrador/manage-routes");
  }

    return (
        <div className='edit-route-container'> 
          <section className = 'edit-route-header'>
            <button
              className="back-button"
              onClick={() => goBackToPreviousPage()}
            >
              <img src={BackIcon} alt="Ícone de Voltar" />
              <span>Voltar</span>
            </button>     

            <h1 className='edit-route-title'> Editar Rota </h1>

            <button className = 'edit-route-delete-button'  onClick={() => handleDeleteRoute()}>
              EXCLUIR ROTA
            </button>
          </section>

          <section className='edit-route-content'>

            <div id="input-place-of-embarkation" className="edit-route-input-container">
              <h2 className="edit-route-input-title">
                Local de embarque <span className="edit-route-required">*</span>
              </h2>

              <div className="edit-route-input-text">
                <input
                  className="edit-route-input"
                  type="text"
                  placeholder="Adicionar local de embarque"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>

            <div id="input-time-of-left" className="edit-route-input-container">
              <h2 className="edit-route-input-title">
                Horário de saída <span className="edit-route-required">*</span>
              </h2>
            
              <div className="edit-route-input-text">
                <input
                  className="edit-route-input"
                  type="text"
                  placeholder="Adicionar horário de saída"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>

            <div id="input-destinations" className="edit-route-input-container">
              <h2 className="edit-route-input-title">
                Destinos <span className="edit-route-required">*</span>
              </h2>

              <div className="edit-route-input-text">
                <input
                  className="edit-route-input"
                  type="text"
                  placeholder="Adicionar destinos"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />

                <button className='edit-route-input-add-icon' onClick={() => console.log("Aaa")}>
                  <FontAwesomeIcon icon= {faCirclePlus} style={{color: '#808080', fontSize: '20px'}} />             
                </button>
              </div>
            </div>
          
          </section>  

          <section className='edit-route-buttons'>
            <button className = 'edit-route-cancel-button' onClick={() => goBackToPreviousPage() }>
              CANCELAR
            </button>

            <button className= 'edit-route-create-button' onClick={() => handleEditRoute()}>
              EDITAR ROTA
            </button>

          </section>

          <ModalConfirmAction 
            modalDescription = {modalDescription}
            isOpen={isModalOpen}
            closeModal={closeModal}
            isDelete = {isDelete}
          />
      </div>
    );
  }

  export default EditRoute;