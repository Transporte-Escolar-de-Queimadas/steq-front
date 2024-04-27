import { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate, useLocation } from 'react-router-dom';
import BackIcon from "../../assets/BackIcon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle, faCirclePlus, faTrashCan, faTrash, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import ModalConfirmAction from '../../components/ModalConfirmAction';
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import Loading from '../../components/Loading';

function EditRoute() {
  const [embarkationPlace, setEmbarkationPlace] = useState('');
  const [embarkationTime, setEmbarkationTime] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [id, setId] = useState("");
  const [currentDestination, setCurrentDestination] = useState('');
  const [action, setAction] = useState("");
  const [route, setRoute] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [isDelete, setIsDelete] = useState();
  const location = useLocation();

  useEffect(() => {

    if (location.state) {
      setLoading(true);
      setEmbarkationPlace(location.state.embarkation_place);
      setEmbarkationTime(location.state.embarkation_time);
      setDestinations(JSON.parse(location.state.destinations));
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
    navigate("/administrador/rotas");
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
    var timeRegex;
    if(embarkationTime.includes(":")){
       timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    } else{
       timeRegex = /^(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])$/;
    } 

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

  function handleEditRoute() {

    const isEmbarkationPlaceValid = validateEmbarkationPlace();
    const isEmbarkationTimeValid = validateEmbarkationTime();
    const isDestinationsValid = validateDestinations();

    if ( isEmbarkationPlaceValid && 
      isEmbarkationTimeValid && isDestinationsValid) {

        var updated_embarkation_time;
        if(embarkationTime.includes(":")){
          updated_embarkation_time = embarkationTime;
        } else{
          updated_embarkation_time = embarkationTime[0]+embarkationTime[1]+":"+embarkationTime[2]+embarkationTime[3];
        } 

        const data = {
          embarkation_place: embarkationPlace,
          embarkation_time: updated_embarkation_time,
          destinations: destinations,
          id: id,
        };

        setRoute(data);
        setAction("updateRoute");
        setModalDescription("Tem certeza que deseja editar essa rota?");
        setIsDelete(false);
        openModal();
      }      
  };

  const handleDeleteRoute = () => {
    const data = {
      id: id,
    };
    setRoute(data);
    setAction("deleteRoute");
    setModalDescription("Tem certeza que deseja excluir essa rota?");
    setIsDelete(true);
    openModal(); // Abre o modal após excluir a rota  
  };

    return (

        <div> 
          {loading ? (
            <div className='edit-route-loading'>
              <Loading />
            </div>
          ) : (
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

                <button className="edit-route-delete-button-minimized" onClick={() => handleDeleteRoute()}>
                  <FontAwesomeIcon icon={faTrashAlt}/>
                </button>
              </section>

              <section className='edit-route-content'>

                <div  className="edit-route-input-container">
                  <h2 className="edit-route-input-title">
                    Local de embarque <span className="edit-route-required">*</span>
                  </h2>

                  <div className="edit-route-input-text">
                    <input
                      id="input-place-of-embarkation"
                      className="edit-route-input"
                      type="text"
                      placeholder="Adicionar local de embarque"
                      onChange={(e) => setEmbarkationPlace(e.target.value)}
                      value={embarkationPlace}
                    />
                  </div>
                </div>

                <div className="edit-route-input-container">
                  <h2 className="edit-route-input-title">
                    Horário de saída <span className="edit-route-required">*</span>
                  </h2>
                
                  <div className="edit-route-input-text">
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

                <div className="edit-route-input-container">
                  <h2 className="edit-route-input-title">
                    Destinos <span className="edit-route-required">*</span>
                  </h2>
                  {destinations.map((destination, index) => (
                        <div key={index} className="edit-route-destination-added-area">
                          <input
                            id="input-destinations"
                            className="edit-route-input added"
                            type="text"
                            value={destination}
                          />
                          <button className="edit-route-input-icon" onClick={() => handleRemoveDestination(index)}>
                            <FontAwesomeIcon icon={faTrash} style={{color: '#808080', fontSize: '20px'}}/>
                          </button>
                        </div>
                      ))
                  }
                  <div className="edit-route-input-text">
                    <input
                      id="input-destinations" 
                      className="edit-route-input"
                      type="text"
                      placeholder="Adicionar destino"
                      onChange={(e) => setCurrentDestination(e.target.value)}
                      value={currentDestination}
                    />

                    <button className='edit-route-input-icon' onClick={() => handleAddDestination()}>
                      <FontAwesomeIcon icon= {faCirclePlus} style={{color: '#808080', fontSize: '20px'}} />             
                    </button>
                  </div>
                </div>
              
              </section>  

              <section className='edit-route-buttons'>
                <button className = 'edit-route-cancel-button' onClick={() => goBackToPreviousPage() }>
                  CANCELAR
                </button>

                <button className= 'edit-route-button' onClick={() => handleEditRoute()}>
                  EDITAR ROTA
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
          )}
      </div>
    );
  }

  export default EditRoute;