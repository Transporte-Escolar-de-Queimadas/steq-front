import { useState } from 'react';
import './styles.css';
import  Notice  from "../../components/Notice";
import { useNavigate } from 'react-router-dom';
import BackIcon from "../../assets/BackIcon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle, faCirclePlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import ModalConfirmAction from '../../components/ModalConfirmAction';


function NewRoute() {
    const [requirementSearchActive, setRequirementSearchActive] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDescription] = useState(
      "Tem certeza que deseja criar essa rota?"
    );
    const [isDelete] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCreateRoute = () => {
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
      navigate("/administrador/manage-routes");
    }

    return (
        <div className='new-route-container'> 
        <section className = 'new-route-header'>
          <button
            className="back-button"
            onClick={() => goBackToPreviousPage()}
          >
            <img src={BackIcon} alt="Ícone de Voltar" />
            <span>Voltar</span>
          </button>     

          <h1 className='new-route-title'> Nova Rota </h1>

        </section>

        <section className='new-route-content'>

            <div id="input-place-of-embarkation" className="new-route-input-container">
                <h2 className="new-route-input-title">
                    Local de embarque <span className="new-route-required">*</span>
                </h2>
                <div className="new-route-input-text">
                    <input
                    className="new-route-input"
                    type="text"
                    placeholder="Adicionar local de embarque"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    />
                </div>
            </div>

            <div id="input-time-of-left" className="new-route-input-container">
                <h2 className="new-route-input-title">
                    Horário de saída <span className="new-route-required">*</span>
                </h2>
                <div className="new-route-input-text">
                    <input
                    className="new-route-input"
                    type="text"
                    placeholder="Adicionar horário de saída"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    />
                </div>
            </div>

            <div id="input-destinations" className="new-route-input-container">
                <h2 className="new-route-input-title">
                    Destinos <span className="new-route-required">*</span>
                </h2>
                <div className="new-route-input-text">
                    <input
                    className="new-route-input"
                    type="text"
                    placeholder="Adicionar destinos"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    />

                    <button className='new-route-input-add-icon' onClick={() => console.log("Aaa")}>
                      <FontAwesomeIcon icon= {faCirclePlus} style={{color: '#808080', fontSize: '20px'}} />             
                    </button>
                </div>
            </div>
        
        </section>  

        <section className='new-route-buttons'>
          <button className = 'new-route-cancel-button' onClick={() => goBackToPreviousPage() }>
            CANCELAR
          </button>

          <button className= 'new-route-create-button' onClick={() => handleCreateRoute()}>
            CRIAR ROTA
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

  export default NewRoute;