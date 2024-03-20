import { useState } from 'react';
import './styles.css';
import { login } from '../../service/admin_service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

/*
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://steq-back.onrender.com/administrador/login',
                JSON.stringify({email, password}),
                {
                    headers: { 'Content-Type': 'application/json' }
                }            
            );

            setUser(response.data);

        } catch (error) {
            if (!error?.response) {
                setError('Erro ao acessar o servidor');
            } else if (error.response.status == 401) {
                setError('Usuário ou senha inválidos');
            }
        }

    };
*/

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email,password).then((response) => {
                setUser(response.data);
            });

            if(user){
                navigate('home');
            }
        
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

    const handleLogout = async (e) => {
        e.preventDefault();
        setUser(null);
        setError('');
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
                                onChange={(e) => setEmail(e.target.value)}
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