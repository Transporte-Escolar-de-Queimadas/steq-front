import { useState } from 'react';
import './styles.css';
import { login } from "../../service/admin_service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter , faMagnifyingGlass, faSort} from '@fortawesome/free-solid-svg-icons';
import  Route  from "../../components/Route";

function Home() {
    const [requirementSearchActive, setRequirementSearchActive] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(true);
  
    const routesData = [
      {
        localPartida: 'SóBolos',
        horarioSaida: '16:45',
        destinos: ['UFCG', 'UEPB', 'UNINASSAU']
      },
      {
        localPartida: 'Pátio do povo',
        horarioSaida: '18:00',
        destinos: ['UFCG', 'UEPB']
      },
      {
        localPartida: 'Pátio do povo',
        horarioSaida: '05:45',
        destinos: ['UFCG', 'IFPB','UEPB', 'UNIFACISA']
      },
      {
        localPartida: 'Pátio do povo',
        horarioSaida: '11:45',
        destinos: ['UNIFACISA', 'IFPB','ESCOLA TERTOLIANO MACIEL']
      },
      {
        localPartida: 'Pedra do ligeiro',
        horarioSaida: '16:30',
        destinos: ['UNIFACISA']
      },
    ]
    const [routes, setRoutes] = useState(routesData);

    const handleSearch = () => {
  
      const filteredRoutes = routes.filter(route =>
        route.destinos.some(destino =>
          destino.toLowerCase().includes(searchKeyword.toLowerCase())
        ) || route.localPartida.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setRoutes(filteredRoutes);

  };

    const handleEnterKey = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
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
              Value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              onKeyPress={handleEnterKey}
            />
            <button className="home-search-input-icon" onClick={() => handleSearch()}>
              <FontAwesomeIcon icon= {faMagnifyingGlass} style={{color: '#888888'}} />             
            </button>

            <button className="home-filter-input-icon">
              <FontAwesomeIcon icon= {faFilter} style={{color: '#888888'}} />
            </button>

            <button className="home-sort-input-icon" >
              <FontAwesomeIcon icon= {faSort} style={{color: '#888888'}} />
            </button>
          </div>


          <button class = "home-requirements-search-button"onClick={() => handleSearch()}>
            BUSCAR
          </button>

          <button class = "home-requirements-search_minimized-button"onClick={() => handleSearch()}>
            <FontAwesomeIcon icon= {faMagnifyingGlass} style={{color: '#888888'}}/> 
          </button>
                        
        </div>   

        <div className='home-routes-container'>
          <section className='home-routes-titles'> 
            <span> Local de embarque </span>
            <span> Horário de saída </span>
            <span> Destinos </span>     
          </section>
          {         
            routes.map(route => {
              return (
                  <Route route={route} /> 
              )
            })
          }
        
        </div>     
      </div>
    );
  }

  export default Home;