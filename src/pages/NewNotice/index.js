import { useState } from 'react';
import './styles.css';
import  Notice  from "../../components/Notice";
import { useNavigate } from 'react-router-dom';
import BackIcon from "../../assets/BackIcon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle, faCirclePlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import ModalConfirmAction from '../../components/ModalConfirmAction';
import { toast } from "react-toastify";

function NewNotice() {
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDescription] = useState(
      "Tem certeza que deseja criar esse aviso?"
    );
    const [isDelete] = useState(false);
    const navigate = useNavigate();
    const [notice, setNotice] = useState('');
    const [action, setAction] = useState('');
    
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    function goBackToPreviousPage() {
      navigate("/administrador/avisos");
    }

    const handleDescriptionChange = (e) => {
      // Captura o valor atual do texto no textarea
      let text = e.target.value;
  
      // Verifica se o texto excede 250 caracteres
      if (text.length > 250) {
        // Se exceder, limita o texto ao máximo de 250 caracteres
        text = text.slice(0, 250);
      }
  
      // Atualiza o estado com o texto limitado
      setDescription(text);
    };

    function validateTitle() {
      let inputTitleContainer = document.getElementById("input-title");
  
      if (title.trim() === "") {
        inputTitleContainer.classList.add("error");  
        toast.error("O título não pode estar em branco.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return false;
      } else {
        inputTitleContainer.classList.remove("error");
        return true;
      }
    }

    function validateDescription() {
      let inputTitleContainer = document.getElementById("input-description");
      if (description.trim() === "") {
        inputTitleContainer.classList.add("error");  
        toast.error("A descrição não pode estar em branco.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return false;
      } else {
        inputTitleContainer.classList.remove("error");
        return true;
      }
    }

    const handleCreateNotice = () => {
      const isTitleValid = validateTitle();
      const isDescriptionValid = validateDescription();

      if ( isTitleValid && 
        isDescriptionValid) {
          const currentDate = new Date().toLocaleDateString();
          const data = {
            title: title,
            description: description,
            date: currentDate,
            edited: false,
          };
          
          setNotice(data);
          setAction("createNotice");
          openModal();         
      }
    };

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

            <div className="new-notice-input-container">
                <h2 className="new-notice-input-title">
                    Título <span className="new-notice-required">*</span>
                </h2>
                <div className="new-notice-input-text">
                    <input
                      id="input-title" 
                      className="new-notice-input"
                      type="text"
                      placeholder="Adicionar título"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                </div>
            </div>
  
            <div className="new-notice-input-container">
              <h2 className="new-notice-input-title">
                Descrição <span className="new-notice-required">*</span>
              </h2>
              <div className="new-notice-input-description-text">
                <textarea
                  id="input-description" 
                  className="new-notice-input-description"
                  placeholder="Adicionar descrição"
                  onChange={handleDescriptionChange}
                  value={description}
                  maxLength={250} 
                />
              </div>
              <p className="new-notice-character-limit"> {description.length}/250</p>
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
      action = {action}
      notice = {notice}
      />
      </div>
    );
  }

  export default NewNotice;