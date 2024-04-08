import { useState } from 'react';
import './styles.css';
import  Notice  from "../../components/Notice";
import { useNavigate } from 'react-router-dom';
import BackIcon from "../../assets/BackIcon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle, faCirclePlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import ModalConfirmAction from '../../components/ModalConfirmAction';

function EditNotice() {
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

  const handleEditNotice = () => {
    // Lógica para editar o aviso
    setModalDescription("Tem certeza que deseja editar esse aviso?")
    setIsDelete(false);
    openModal(); // Abre o modal após editar o aviso
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteNotice = () => {
    // Lógica para excluir o aviso
    setModalDescription("Tem certeza que deseja excluir esse aviso?")
    setIsDelete(true);
    openModal(); // Abre o modal após excluir o aviso
  };

  function goBackToPreviousPage() {
    navigate("/administrador/manage-routes");
  }

    return (
        <div className='edit-notice-container'> 
          <section className = 'edit-notice-header'>
            <button
              className="back-button"
              onClick={() => goBackToPreviousPage()}
            >
              <img src={BackIcon} alt="Ícone de Voltar" />
              <span>Voltar</span>
            </button>     

            <h1 className='edit-notice-title'> Editar Aviso </h1>

            <button className = 'edit-notice-delete-button'  onClick={() => handleDeleteNotice()}>
              EXCLUIR AVISO
            </button>
          </section>

          <section className='edit-notice-content'>
            <div id="input-title" className="edit-notice-input-container">
                <h2 className="edit-notice-input-title">
                    Título <span className="edit-notice-required">*</span>
                </h2>
                <div className="edit-notice-input-text">
                    <input
                    className="edit-notice-input"
                    type="text"
                    placeholder="Adicionar título"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    />
                </div>
            </div>

            <div id="input-description" className="edit-notice-input-container">
              <h2 className="edit-notice-input-title">
                Descrição <span className="edit-notice-required">*</span>
              </h2>
              <div className="edit-notice-input-text">
                <input
                  className="edit-notice-input"
                  type="text"
                  placeholder="Adicionar descrição"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <p className="edit-notice-character-limit">50/500</p>
            </div>         
          </section>  

          <section className='edit-route-buttons'>
            <button className = 'edit-route-cancel-button' onClick={() => goBackToPreviousPage() }>
              CANCELAR
            </button>

            <button className= 'edit-route-create-button' onClick={() => handleEditNotice()}>
              EDITAR AVISO
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

  export default EditNotice;