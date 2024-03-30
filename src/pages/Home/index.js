import { useState, useEffect } from 'react';
import './styles.css';
import { login } from "../../service/admin_service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilter,faMagnifyingGlass, faSort, faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import  Route  from "../../components/Route";
import { useNavigate } from 'react-router-dom';

function Home() {
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

    const handleNotice = () => {
      navigate('avisos');
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
  
  
    return (
      <div className='home-container'> 
        <span className='home-title'> Transporte Escolar de Queimadas</span>
        <div className="home-search-input-container">
          <div className="home-search-input-area">
            <input 
              autoFocus 
              type='search'
              placeholder="Buscar destino" 
              onBlur={() => setTimeout(() => setRequirementSearchActive(false), 300)}
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              onKeyPress={handleEnterKey}
            />
            <button className='home-search-input-icon' onClick={() => handleSearch()}>
              <FontAwesomeIcon icon= {faMagnifyingGlass} style={{color: '#888888'}} />             
            </button>

            <button className='home-filter-input-icon'>
              <FontAwesomeIcon icon= {faFilter} style={{color: '#888888'}} />
            </button>

          </div>

          <button className= 'home-requirements-search-button' onClick={() => handleSearch()}>
            BUSCAR
          </button>

          <button className = 'home-requirements-notices-button'  onClick={() => handleNotice()}>
            AVISOS
          </button>

          <button className = 'home-requirements-search_minimized-button' onClick={() => handleSearch()}>
            <FontAwesomeIcon icon= {faMagnifyingGlass} style={{color: '#888888'}}/> 
          </button>
                        
        </div>   

        <div className='home-routes-container'>
          <section className='home-routes-titles'> 
            <span> Local de embarque </span>
            <span> 
              Horário de saída 

              <button className='home-sort-title-icon' onClick={handleSort}>
                <FontAwesomeIcon icon={ascendingOrder ? faLongArrowAltUp : faLongArrowAltDown } style={{ color: '#0C4E8A'}} />
              </button>

            </span>
            <span className='home-routes-titles-destination'> Destinos </span>     
          </section>
 
          {    
          loading ? (
            <div className="home-loading">Carregando...</div>
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

  export default Home;