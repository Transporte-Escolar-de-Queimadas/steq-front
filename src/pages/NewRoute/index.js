import { useState } from 'react';
import './styles.css';
import  Notice  from "../../components/Notice";
import { useNavigate } from 'react-router-dom';
import BackIcon from "../../assets/BackIcon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle, faCirclePlus, faTrashCan, faTrash} from '@fortawesome/free-solid-svg-icons';
import ModalConfirmAction from '../../components/ModalConfirmAction';
import InputMask from "react-input-mask";
import { toast } from "react-toastify";


function NewRoute() {
    const [embarkationPlace, setEmbarkationPlace] = useState('');
    const [embarkationTime, setEmbarkationTime] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [currentDestination, setCurrentDestination] = useState('');
    const [action, setAction] = useState("");
    const [route, setRoute] = useState("");
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDescription] = useState(
      "Tem certeza que deseja criar essa rota?"
    );
    const [isDelete] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  /*
    const handleCreateRoute = () => {
      // Lógica para criar a rota
      openModal(); // Abre o modal após criar a rota
    };
  */

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleNotice = () => {
      navigate('avisos');
    };

    function goBackToPreviousPage() {
      navigate("/administrador/manage-routes");
    }

    const handleAddDestination = () => {
      if (currentDestination.trim() !== '') {
        setDestinations([...destinations, currentDestination]);
        setCurrentDestination('');
      }
    };

    const handleRemoveDestination = (index) => {
      const updatedDestinations = destinations.filter((_, idx) => idx !== index);
      setDestinations(updatedDestinations);
    };

    function validateEmbarkationPlace() {
      let inputTitleContainer = document.getElementById("input-place-of-embarkation");
  
      if (embarkationPlace.trim() === "") {
        inputTitleContainer.classList.add("error");  
        toast.error("O local de embarque não pode estar em branco.", {
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

    function validateEmbarkationTime() {
      let inputTitleContainer = document.getElementById("input-time-of-left");
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])$/;
      const isValidTime = timeRegex.test(embarkationTime);

      if (embarkationTime.trim() === "") {
        inputTitleContainer.classList.add("error"); 
        toast.error("O horário de saída não pode estar em branco.", {
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

      } else if (!isValidTime) {
        inputTitleContainer.classList.add("error");        
          toast.error("Por favor, insira um horário de saída válido (HH:MM).", {
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
      }
       else if (embarkationTime.trim() !== "" && isValidTime){
        inputTitleContainer.classList.remove("error");
        return true;
      }
    }

    function validateDestinations() {
      let inputTitleContainer = document.getElementById("input-destinations");
  
      if (destinations.length < 1 ) {
        inputTitleContainer.classList.add("error");
  
        toast.error("O destino não pode estar em branco.", {
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

    function handleCreateRoute() {
      
      const isEmbarkationPlaceValid = validateEmbarkationPlace();
      const isEmbarkationTimeValid = validateEmbarkationTime();
      const isDestinationsValid = validateDestinations();

      if ( isEmbarkationPlaceValid && 
      isEmbarkationTimeValid && isDestinationsValid) {
        
        const data = {
          embarkation_place: embarkationPlace,
          embarkation_time: embarkationTime[0]+embarkationTime[1]+":"+embarkationTime[2]+embarkationTime[3],
          destinations: destinations,
        };
  
        setRoute(data);
        setAction("create");
        openModal();
      }
      
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

            <div  className="new-route-input-container">
                <h2 className="new-route-input-title">
                    Local de embarque <span className="new-route-required">*</span>
                </h2>
                <div className="new-route-input-text">
                    <input
                    id="input-place-of-embarkation"
                    className="new-route-input"
                    type="text"
                    placeholder="Adicionar local de embarque"
                    onChange={(e) => setEmbarkationPlace(e.target.value)}
                    value={embarkationPlace}
                    />
                </div>
            </div>

            <div className="new-route-input-container">
                <h2 className="new-route-input-title">
                    Horário de saída <span className="new-route-required">*</span>
                </h2>
                <div className="new-route-input-text">
                  <InputMask
                    id="input-time-of-left" 
                    placeholder="Adicionar horário de saída"
                    className="new-route-input"
                    maskplaceholder=" "
                    mask="99:99"
                    value={embarkationTime}
                    onChange={(e) => setEmbarkationTime(e.target.value.replace(/[^\d]/g, ""))}
                    required
                  />
                </div>
            </div>

            <div className="new-route-input-container">
                <h2 className="new-route-input-title">
                    Destinos <span className="new-route-required">*</span>
                </h2>
                {destinations.map((destination, index) => (
                    <div key={index} className="new-route-destination-added-area">
                      <input
                        id="input-destinations"
                        className="new-route-input added"
                        type="text"
                        value={destination}
                      />
                      <button className="new-route-input-icon" onClick={() => handleRemoveDestination(index)}>
                        <FontAwesomeIcon icon={faTrash} style={{color: '#808080', fontSize: '20px'}}/>
                      </button>
                    </div>
                  ))
                }
                <div className="new-route-input-text">
                    <input
                    id="input-destinations"
                    className="new-route-input"
                    type="text"
                    placeholder="Adicionar destinos"
                    onChange={(e) => setCurrentDestination(e.target.value)}
                    value={currentDestination}
                    />

                    <button className='new-route-input-icon' onClick={() => handleAddDestination()}>
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
      action = {action}
      route = {route}
      />
      </div>
    );
  }

  export default NewRoute;