import { useState, useEffect } from 'react';
import './styles.css';
import  Notice  from "../../components/Notice";
import { useNavigate } from 'react-router-dom';
import BackIcon from "../../assets/BackIcon.svg";
import { getAllNotices } from '../../service/notices_service';
import { toast } from "react-toastify";

function ManageNotices() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [notices, setNotices] = useState();

    useEffect(() => {   
      renderNotices();
    }, []); // Executar apenas uma vez na primeira renderização

    function renderNotices() {
    setLoading(true);
    getAllNotices()
    .then((response) => {
      
      // Define uma comparação entre datas
      const compareNotices = (a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('/'));
        const dateB = new Date(b.date.split('/').reverse().join('/'));
    
        if (dateA > dateB) return -1; // DateA é mais novo (fica no início)
        if (dateA < dateB) return 1; // DateA é mais antigo (fica no final)
        // se as datas são iguais, quem tem o id maior fica na frente (adição mais recente)
        return b.id - a.id;
      };
    
      if(response.length > 1) {
      // Sort the notices array using the comparison function
      const sortedNotices = [...response].sort(compareNotices);
        setNotices(sortedNotices);
      } else {
        setNotices(response);
      }
      })
      .catch((error) => {
        toast.error("Erro ao buscar avisos", {
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
      });
    }
    
    const handleNewNotice = () => {
      navigate('/administrador/novo-aviso');
    };

    function goBackToPreviousPage() {
      navigate("/administrador/home");
    }

    return (
        <div className='manage-notices-container'> 
        <section className = 'manage-notices-header'>
          <button
            className="back-button"
            onClick={() => goBackToPreviousPage()}
          >
            <img src={BackIcon} alt="Ícone de Voltar" />
            <span>Voltar</span>
          </button>     

          <h1 className='manage-notices-title'> Avisos </h1>

          <button className = 'manage-notices-new-button'  onClick={() => handleNewNotice()}>
            NOVO AVISO
          </button>
        </section>

        <div className='manage-notices-content'>

        {loading ? (
            <div className="home-loading">Carregando...</div>
          ) : (
            // Se 'loading' for falso, renderize o conteúdo abaixo
            notices.length < 1 ? (
              // Se o array 'notices' estiver vazio, renderize "nenhum aviso encontrado"
              <div> Nenhuma rota encontrada... </div>
            ) : (
              // Se o array 'notices' não estiver vazio, renderize os avisos
              notices.map(notice => {
                return (
                    <Notice key = {notice.id} notice={notice} /> 
                )
              })
            )
        )}
        
        </div>  

      </div>
    );
  }

  export default ManageNotices;