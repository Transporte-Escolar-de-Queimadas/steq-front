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
import BackIcon from "../../assets/BackIcon.svg";

function ManageRoutes() {
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
          <div className='manage-routes-search-area' >
            <div className="manage-routes-search-input-area">
              <input 
                  autoFocus 
                  type='search'
                  placeholder='Buscar destino'
                  value={searchKeyword}
                  onChange={(event) => setSearchKeyword(event.target.value)}
                  onKeyPress={handleEnterKey}
              />
              <button className='manage-routes-search-input-icon' onClick={() => handleSearch()}>
                <FontAwesomeIcon icon= {faMagnifyingGlass} style={{color: '#888888'}} />             
              </button>

              <button className='manage-routes-filter-input-icon' onClick={() => handleActiveFilterArea()}>
                <FontAwesomeIcon icon= {faFilter} style={{color: '#888888'}} />
              </button>

            </div>

            <div className={`manage-routes-filter-area ${showFilterArea ? 'active' : ''}`}>
              <span className='manage-routes-filter-title'> Turno:</span>  
                <div className='manage-routes-filter-button-area'>
                  <button className={`manage-routes-filter-button ${showFilter === 'Manhã' ? 'active' : ''}`}
                  onClick={() => handleActiveFilter('Manhã')}>
                  </button> 
                  <span> Manhã</span>
                </div>
                <div className='manage-routes-filter-button-area'>
                  <button className={`manage-routes-filter-button ${showFilter === 'Tarde' ? 'active' : ''}`}
                  onClick={() => handleActiveFilter('Tarde')}>
                  </button> 
                  <span> Tarde</span>
                </div>
                <div className='manage-routes-filter-button-area'>
                  <button className={`manage-routes-filter-button ${showFilter === 'Noite' ? 'active' : ''}`}
                  onClick={() => handleActiveFilter('Noite')}
                  ></button> 
                  <span> Noite</span>
                </div>              
            </div>
          </div>


          <button className= 'manage-routes-requirements-search-button' onClick={() => handleSearch()}>
            BUSCAR
          </button>

          <button className = 'manage-routes-requirements-new-button'  onClick={() => handleNewRoute()}>
            NOVA ROTA
          </button>

          <button className = 'manage-routes-requirements-search-minimized-button' onClick={() => handleSearch()}>
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
 
          {loading ? (
            <div className="manage-routes-loading">Carregando...</div>
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

  export default ManageRoutes;