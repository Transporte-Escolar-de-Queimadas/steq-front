import { useState, useEffect } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilter,faMagnifyingGlass, faSort, faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import  Route  from "../../components/Route";
import { useNavigate } from 'react-router-dom';
import BackIcon from "../../assets/BackIcon.svg";

function ManageRoutes() {
    const [requirementSearchActive, setRequirementSearchActive] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    const routesData = [
      {
        id: 1,
        localPartida: 'Point das Vans',
        horarioSaida: '18:00',
        destinos: ['UFCG', 'UEPB', 'UNINASSAU']
      },
      {
        id: 2,
        localPartida: 'Pátio do povo',
        horarioSaida: '05:45',
        destinos: ['UFCG', 'UEPB']
      },
      {
        id: 3,
        localPartida: 'Pátio do povo',
        horarioSaida: '11:45',
        destinos: ['UFCG', 'IFPB','UEPB', 'UNIFACISA']
      },
      {
        id: 4,
        localPartida: 'Point das vans',
        horarioSaida: '05:45',
        destinos: ['UNIFACISA', 'IFPB','UNIP']
      },
      {
        id: 5,
        localPartida: 'Pedra do ligeiro',
        horarioSaida: '16:30',
        destinos: ['UNIFACISA']
      },
    ]
    const [ascendingOrder, setAscendingOrder] = useState(true);
    const [routes, setRoutes] = useState(routesData);

    useEffect(() => {
      handleSort(); // Ordenar rotas por padrão
      setLoading(false);
    }, []); // Executar apenas uma vez na primeira renderização

    const handleSearch = () => {
      setLoading(true);
      const filteredRoutes = routes.filter(route =>
        route.destinos.some(destino =>
          destino.toLowerCase().includes(searchKeyword.toLowerCase())
        ) || route.localPartida.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setRoutes(filteredRoutes);
      setLoading(false);
    };

    const handleNewRoute = () => {
      navigate('/administrador/new-route');
    };

    const handleEnterKey = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

    const handleSort = () => {
      setLoading(true);
      const sortedRoutes = [...routes].sort((a, b) => {
        const timeA = new Date(`2000-01-01T${a.horarioSaida}`);
        const timeB = new Date(`2000-01-01T${b.horarioSaida}`);
  
        return ascendingOrder ? timeA - timeB : timeB - timeA;
      });
  
      setAscendingOrder(!ascendingOrder);
      setRoutes(sortedRoutes);
      setLoading(false);
    };

    function goBackToPreviousPage() {
        navigate("/administrador/home");
      }
  
  
    return (
      <div className='manage-routes-container'> 
        <section className = 'manage-routes-header'>
          <button
            className="back-button"
            onClick={() => goBackToPreviousPage()}
          >
            <img src={BackIcon} alt="Ícone de Voltar" />
            <span>Voltar</span>
          </button>     

          <h1 className='manage-routes-title'> Rotas </h1>
        </section>

        <div className="manage-routes-search-input-container">
          <div className="manage-routes-search-input-area">
            <input 
              autoFocus 
              type='search'
              placeholder="Buscar destino" 
              onBlur={() => setTimeout(() => setRequirementSearchActive(false), 300)}
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              onKeyPress={handleEnterKey}
            />
            <button className='manage-routes-search-input-icon' onClick={() => handleSearch()}>
              <FontAwesomeIcon icon= {faMagnifyingGlass} style={{color: '#888888'}} />             
            </button>

            <button className='manage-routes-filter-input-icon'>
              <FontAwesomeIcon icon= {faFilter} style={{color: '#888888'}} />
            </button>

          </div>

          <button className= 'manage-routes-requirements-search-button' onClick={() => handleSearch()}>
            BUSCAR
          </button>

          <button className = 'manage-routes-requirements-new-button'  onClick={() => handleNewRoute()}>
            NOVA ROTA
          </button>

          <button className = 'manage-routes-requirements-search_minimized-button' onClick={() => handleSearch()}>
            <FontAwesomeIcon icon= {faMagnifyingGlass} style={{color: '#888888'}}/> 
          </button>
                        
        </div>   

        <div className='manage-routes-routes-container'>
          <section className='manage-routes-routes-titles'> 
            <span> Local de embarque </span>
            <span> 
              Horário de saída 

              <button className='manage-routes-sort-title-icon' onClick={handleSort}>
                <FontAwesomeIcon icon={ascendingOrder ? faLongArrowAltUp : faLongArrowAltDown } style={{ color: '#0C4E8A'}} />
              </button>

            </span>
            <span className='manage-routes-routes-titles-destination'> Destinos </span>     
          </section>
 
          {    
          loading ? (
            <div className="manage-routes-loading">Carregando...</div>
          ) : (              
            routes.map(route => {
              return (
                  <Route key={route.id} route={route} /> 
              )
            })
          )}
        
        </div>  

      </div>
    );
  }

  export default ManageRoutes;