import { useState } from 'react';
import './styles.css';
import  Notice  from "../../components/Notice";
import { useNavigate } from 'react-router-dom';
import BackIcon from "../../assets/BackIcon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle, faCirclePlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import ModalConfirmAction from '../../components/ModalConfirmAction';


function NewNotice() {
    const [requirementSearchActive, setRequirementSearchActive] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDescription] = useState(
      "Tem certeza que deseja criar esse aviso?"
    );
    const [isDelete] = useState(false);
    const navigate = useNavigate();
    

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCreateNotice = () => {
      // Lógica para criar a rota
      openModal(); // Abre o modal após criar a rota
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleNotice = () => {
      navigate('avisos');
    };

    function goBackToPreviousPage() {
      navigate("/administrador/manage-notices");
    }

    return (
        <div className='new-notice-container'> 
        <section className = 'new-notice-header'>
          <button
            className="back-button"
            onClick={() => goBackToPreviousPage()}
          >
            <img src={BackIcon} alt="Ícone de Voltar" />
            <span>Voltar</span>
          </button>     

          <h1 className='new-notice-title'> Novo Aviso </h1>

        </section>

        <section className='new-notice-content'>

            <div id="input-title" className="new-notice-input-container">
                <h2 className="new-notice-input-title">
                    Título <span className="new-notice-required">*</span>
                </h2>
                <div className="new-notice-input-text">
                    <input
                    className="new-notice-input"
                    type="text"
                    placeholder="Adicionar título"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    />
                </div>
            </div>

            <div id="input-description" className="new-notice-input-container">
              <h2 className="new-notice-input-title">
                Descrição <span className="new-notice-required">*</span>
              </h2>
              <div className="new-notice-input-text">
                <input
                  className="new-notice-input"
                  type="text"
                  placeholder="Adicionar descrição"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <p className="new-notice-character-limit">50/500</p>
            </div>
        </section>  

        <section className='new-notice-buttons'>
          <button className = 'new-notice-cancel-button' onClick={() => goBackToPreviousPage() }>
            CANCELAR
          </button>

          <button className= 'new-notice-create-button' onClick={() => handleCreateNotice()}>
            CRIAR AVISO
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

  export default NewNotice;