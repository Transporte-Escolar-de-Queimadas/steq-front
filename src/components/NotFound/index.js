import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faRoute, faMapMarked, faMapMarkedAlt, faBullhorn} from '@fortawesome/free-solid-svg-icons';

export default function NotFound( {description}) {

    return (
        <div className='not-found-area'>
            {description.includes('rota') ?
            <FontAwesomeIcon className='not-found-icon' icon=  {faMapMarkedAlt}/> : 
            <FontAwesomeIcon className='not-found-icon' icon=  {faBullhorn}/>
            }
            <span className='not-found-description'> {description}</span>
        </div>
    )
}