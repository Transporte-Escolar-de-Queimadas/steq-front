import { useState, useEffect} from 'react';
import './styles.css';
import { login } from '../../service/admin_service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import cookies from "../../utils/cookies";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        var storedUser = cookies.getCookie("@steq/token");
    
        if (storedUser) {
          navigate("/administrador/home");
        }
      }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = {
                username: username,
                password: password,
            }
            await login(data);
            navigate('home');              
        }catch (error) {
            toast.error('Erro de autenticação', {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'colored',
              });
        }
    };

    return (
        <div className='login-container'>
            <div className='login-form-wrap'>
                        <h2>Login</h2>                
                        <form className='login-form'>
                        <input type='user' 
                                name='user' 
                                placeholder='Usuário' 
                                required
                                onChange={(e) => setUsername(e.target.value)}
                                />
                        <input type='password' 
                                name='password' 
                                placeholder='Senha' 
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        <button type='submit' 
                                className='btn-login'
                                onClick={handleLogin}>  
                                ENTRAR
                        </button>
                        </form>
            </div>
        </div>
    );
  }

  export default Login;