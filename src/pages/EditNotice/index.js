import { useState , useEffect} from 'react';
import './styles.css';
import  Notice  from "../../components/Notice";
import { useNavigate, useLocation } from 'react-router-dom';
import BackIcon from "../../assets/BackIcon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle, faCirclePlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import ModalConfirmAction from '../../components/ModalConfirmAction';
import { toast } from "react-toastify";

function EditNotice() {
  const [requirementSearchActive, setRequirementSearchActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [isDelete, setIsDelete] = useState();
  const [notice, setNotice] = useState('');
  const [action, setAction] = useState('');
  const location = useLocation();

  useEffect(() => {

    if (location.state) {
      setLoading(true);
      setTitle(location.state.title);
      setDescription(location.state.description);
      setId(location.state.id);
      setLoading(false);
    } 
  }, [location.state]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function goBackToPreviousPage() {
    navigate("/administrador/manage-notices");
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

  const handleEditNotice = () => {
    const isTitleValid = validateTitle();
    const isDescriptionValid = validateDescription();

    if (isTitleValid && 
      isDescriptionValid) {
        const currentDate = new Date().toLocaleDateString();
        const data = {
          title: title,
          description: description,
          date: currentDate,
          edited: true,
          id: id,
        };
        
        setNotice(data);
        setIsDelete(false);
        setModalDescription("Tem certeza que deseja editar esse aviso?")
        setAction("updateNotice");
        openModal();         
    }
  
  };

  const handleDeleteNotice = () => {
    const data = {
      id: id,
    };
    setNotice(data);
    setIsDelete(false);
    setModalDescription("Tem certeza que deseja excluir esse aviso?")
    setAction("deleteNotice");
    openModal(); // Abre o modal após excluir o aviso
  };

    return (
      <div>
        { 
        loading ? (
            <div className="home-loading">Carregando...</div>
          ) : ( 
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
                <div className="edit-notice-input-container">
                    <h2 className="edit-notice-input-title">
                        Título <span className="edit-notice-required">*</span>
                    </h2>
                    <div className="edit-notice-input-text">
                        <input
                        id="input-title"
                        className="edit-notice-input"
                        type="text"
                        placeholder="Adicionar título"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        />
                    </div>
                </div>
    
                <div className="edit-notice-input-container">
                  <h2 className="edit-notice-input-title">
                    Descrição <span className="edit-notice-required">*</span>
                  </h2>
                  <div className="edit-notice-input-description-text">
                    <textarea
                      id="input-description" 
                      className="edit-notice-input-description"
                      placeholder="Adicionar descrição"
                      onChange={handleDescriptionChange}
                      value={description}
                      maxLength={250} 
                    />
                  </div>
                  <p className="new-notice-character-limit"> {description.length}/250</p>
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
                action = {action}
                notice = {notice}
              />
            </div>
          )        
        }
      </div>
    );
  }

  export default EditNotice;