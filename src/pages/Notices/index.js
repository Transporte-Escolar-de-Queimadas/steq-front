import { useState } from 'react';
import './styles.css';
import { login } from "../../service/admin_service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter , faMagnifyingGlass, faSort} from '@fortawesome/free-solid-svg-icons';
import  Route  from "../../components/Route";
import  Notice  from "../../components/Notice";
import { useNavigate } from 'react-router-dom';
import BackIcon from "../../assets/BackIcon.svg";

function Notices() {
    const [requirementSearchActive, setRequirementSearchActive] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    const noticesData = [
      {
        id: 1,
        titulo: 'Sem ônibus para a UEPB na próxima quinta (24/03)',
        data: '22/03/24',
        descricao: 'Devido aos últimos acontecimentos na UEPB não haverá ônibus neste dia para a instituição.'
      },
      {
        id: 2,
        titulo: 'Ônibus escolares de férias',
        data: '18/12/24',
        descricao: 'Os ônibus entrarão de férias neste dia 20 de dezembro e até o dia 20 de janeiro, desejamos a todos os alunos boas férias!'
      },
      {
        id: 3,
        titulo: 'Todos os ônibus não irão passar pela UFCG por tempo indeterminado',
        data: '22/03/24',
        descricao: 'Os ônibus não passarão na UFCG devido à greve que iniciou semana passada'
      },
      {
        id: 4,
        titulo: 'Mais um ônibus irá para o IFPB',
        data: '22/02/24',
        descricao: 'Devido ao grande número de alunos neste semestre, o ônibus que sai de 12h15m do pátio do povo também passará no IFPB para diminuir a superlotação'
      },
    ]

    const [notices, setNotices] = useState(noticesData);

    const handleNotice = () => {
      navigate('avisos');
    };

    function goBackToPreviousPage() {
      navigate("/");
    }
  
    return (
      <div className='notices-container'> 
        <section className = 'notices-header'>
          <button
            className="back_button"
            onClick={() => goBackToPreviousPage()}
          >
            <img src={BackIcon} alt="Ícone de Voltar" />
            <span>Voltar</span>
          </button>     

          <span className='notices-title'> Avisos </span>
        </section>

        <div className='notices-content'>

          {         
            notices.map(notice => {
              return (
                  <Notice key = {notice.id} notice={notice} /> 
              )
            })
          }
        
        </div>  

      </div>
    );
  }

  export default Notices;