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
import { toast } from "react-toastify";

function Home() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [hasSearchKeyword, setHasSearchKeyWord] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);
    const [showFilterArea, setShowFilterArea] = useState(false);
    const [ascendingOrder, setAscendingOrder] = useState(true);
    const [routes, setRoutes] = useState();
  
    useEffect(() => {   
      setLoading(true); 
      getAllRoutes()
      .then((response) => {
        setRoutes(response);      
      })
      .catch((error) => {
        toast.error("Erro ao buscar rotas", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .finally(() => {
        handleSort();
        setLoading(false);
      });
    }, []); // Executar apenas uma vez na primeira renderização

    const handleSearch = () => {

      if(searchKeyword){
        setHasSearchKeyWord(true);
      } else{
        setHasSearchKeyWord(false);
      }

      setLoading(true);
    // pegar a ordenação ao contrário porque ao final do handleSort, o estado é invertido
    // preparando a função para o próximo handleSort.
      const searchAscendingOrder = !ascendingOrder;
      
      getAllRoutes().then(response => {
        
        // Aplicar a ordenação na lista 
        const sortedFilteredRoutes = response.sort((a, b) => {
          const timeA = new Date(`2000-01-01T${a.embarkation_time}`);
          const timeB = new Date(`2000-01-01T${b.embarkation_time}`);
          return searchAscendingOrder ? timeA - timeB : timeB - timeA;
        });

        const filteredRoutes = sortedFilteredRoutes.filter((route) => {
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
        toast.error("Erro ao buscar rotas", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
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
      setLoading(true);
      // se há turno ou foi filtrado por destino, deve ordenar pela lista de rotas filtrada 
      if(showFilter || hasSearchKeyword){
        try {
          const sortedRoutes = routes.sort((a, b) => {
            const timeA = new Date(`2000-01-01T${a.embarkation_time}`);
            const timeB = new Date(`2000-01-01T${b.embarkation_time}`);
      
            return ascendingOrder ? timeA - timeB : timeB - timeA;
          });
          setRoutes(sortedRoutes);    
          setAscendingOrder(!ascendingOrder);   
          setLoading(false);      
        } catch (error) {
            toast.error("Erro ao ordenar rotas", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
        }
      } else{
        // se não, ordena pela rota que vem da API
        getAllRoutes().then(response => {
          const sortedRoutes = response.sort((a, b) => {
            const timeA = new Date(`2000-01-01T${a.embarkation_time}`);
            const timeB = new Date(`2000-01-01T${b.embarkation_time}`);
      
            return ascendingOrder ? timeA - timeB : timeB - timeA;
          });
          setRoutes(sortedRoutes);
        })
        .catch((error) => {
          toast.error("Erro ao ordenar rotas", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .finally(() => {
          setAscendingOrder(!ascendingOrder);   
          setLoading(false);      
        });
      }
    }; 

    // Ativa ou muda de filtro entre os turnos manhã, tarde ou noite.
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

          <button className = 'home-requirements-search-minimized-button' onClick={() => handleSearch()}>
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
 
          {loading ? (
            <div className="home-loading">Carregando...</div>
          ) : (
            // Se 'loading' for falsa, renderize o conteúdo abaixo
            routes.length < 1 ? (
              // Se o array 'routes' estiver vazio, renderize "nenhuma rota encontrada"
              <div> Nenhuma rota encontrada... </div>
            ) : (
              // Se o array 'routes' não estiver vazio, renderize as rotas
              routes.map((route) => {
                return <Route key={route.id} route={route} />;
              })
            )
          )}
        
        </div>  

      </div>
    );
  }

  export default Home;