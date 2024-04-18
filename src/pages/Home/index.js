import { useState, useEffect, useContext } from 'react';
import './styles.css';
import { login } from "../../service/admin_service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilter,faMagnifyingGlass, faSort, faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import  Route  from "../../components/Route";
import { useNavigate } from 'react-router-dom';
import { getAllRoutes } from '../../service/routes_service';
import { useRoutes } from '../../contexts/routesContext';
import {RoutesContext} from "../../contexts/routesContext"

function Home() {
    const [requirementSearchActive, setRequirementSearchActive] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);
    const [showFilterArea, setShowFilterArea] = useState(false);
    const [ascendingOrder, setAscendingOrder] = useState(true);
    const [routes, setRoutes] = useState();
  
    const routesData = [
      {
        id: 1,
        embarkation_place: 'Point das Vans',
        embarkation_time: '18:00',
        destinations: ['UFCG', 'UEPB', 'UNINASSAU']
      },
      {
        id: 2,
        embarkation_place: 'Pátio do povo',
        embarkation_time: '05:45',
        destinations: ['UFCG', 'UEPB']
      },
      {
        id: 3,
        embarkation_place: 'Pátio do povo',
        embarkation_time: '11:45',
        destinations: ['UFCG', 'IFPB','UEPB', 'UNIFACISA']
      },
      {
        id: 4,
        embarkation_place: 'Point das vans',
        embarkation_time: '05:45',
        destinations: ['UNIFACISA', 'IFPB','UNIP']
      },
      {
        id: 5,
        embarkation_place: 'Pedra do ligeiro',
        embarkation_time: '16:30',
        destinations: ['UNIFACISA']
      },
    ]

    useEffect(() => {   
      setLoading(true); 
      getAllRoutes()
      .then((response) => {
        console.log("response", response);   
      //  setRoutes(response);
        console.log("SetRoutes?:", routes);
        setRoutes(response);
        
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        handleSort();
        setLoading(false);
      });
    }, []); // Executar apenas uma vez na primeira renderização

    const handleSearch = () => {
      setLoading(true);
      getAllRoutes().then(response => {
        const filteredRoutes = response.filter((route) => {
          const time = parseInt(route.embarkation_time.split(':')[0], 10);
          const destinationsArray = JSON.parse(route.destinations);
          const routeIsValid =  destinationsArray.some((destino) => destino.toLowerCase().includes(searchKeyword.toLowerCase())) ||
          route.embarkation_place.toLowerCase().includes(searchKeyword.toLowerCase())
          if (showFilter && routeIsValid) {
            // Filtrar com base no horário de saída e no filtro ativo
            if (showFilter === 'Manhã') {
              return time >= 4 && time < 12;
            } else if (showFilter === 'Tarde') {
              return time >= 12 && time < 18;
            } else if (showFilter === 'Noite') {
              return time >= 18 || time < 4;
            }
          } else {
            // Filtrar apenas por termo de busca
            return routeIsValid;       
          }
        });
        setRoutes(filteredRoutes);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);       
      })
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
      console.log("useState routes:", routes);
      setLoading(true);
      getAllRoutes().then(response => {
        const sortedRoutes = response.sort((a, b) => {
          const timeA = new Date(`2000-01-01T${a.embarkation_time}`);
          const timeB = new Date(`2000-01-01T${b.embarkation_time}`);
    
          return ascendingOrder ? timeA - timeB : timeB - timeA;
        });
        setRoutes(sortedRoutes);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setAscendingOrder(!ascendingOrder);
        setLoading(false);
      });
    };

  /*
  Esse useEffect está atrapalhando o useEffect do handle Sort?
    useEffect(() => {
      handleSearch(); // Executar busca sempre que showFilter mudar
    }, [showFilter]); // Dependências que acionam o useEffect()
    */

    const handleActiveFilter = (filter) => {
      setShowFilter(showFilter === filter ? false : filter);
    };

    const handleActiveFilterArea = () => {
      setShowFilterArea(!showFilterArea);
    };

    return (
      <div className='home-container'> 
        <h1 className='home-title'> Transporte Escolar de Queimadas</h1>
        <div className='home-search-input-container'>
          <div className='home-search-area'>
            <div className='home-search-input-area'>
              <input 
                autoFocus 
                type='search'
                placeholder='Buscar destino'
                onBlur={() => setTimeout(() => setRequirementSearchActive(false), 300)}
                value={searchKeyword}
                onChange={(event) => setSearchKeyword(event.target.value)}
                onKeyPress={handleEnterKey}
              />
              <button className='home-search-input-icon' onClick={() => handleSearch()}>
                <FontAwesomeIcon icon= {faMagnifyingGlass} style={{color: '#888888'}} />             
              </button>

              <button className='home-filter-input-icon' onClick={() => handleActiveFilterArea()}>
                <FontAwesomeIcon icon= {faFilter} style={{color: '#888888'}} />
              </button>

            </div>

            <div className={`home-filter-area ${showFilterArea ? 'active' : ''}`}>
              <span className='home-filter-title'> Turno:</span>  
                <div className='home-filter-button-area'>
                  <button className={`home-filter-button ${showFilter === 'Manhã' ? 'active' : ''}`}
                  onClick={() => handleActiveFilter('Manhã')}>
                  </button> 
                  <span> Manhã</span>
                </div>
                <div className='home-filter-button-area'>
                  <button className={`home-filter-button ${showFilter === 'Tarde' ? 'active' : ''}`}
                  onClick={() => handleActiveFilter('Tarde')}>
                  </button> 
                  <span> Tarde</span>
                </div>
                <div className='home-filter-button-area'>
                  <button className={`home-filter-button ${showFilter === 'Noite' ? 'active' : ''}`}
                  onClick={() => handleActiveFilter('Noite')}
                  ></button> 
                  <span> Noite</span>
                </div>              
            </div>
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