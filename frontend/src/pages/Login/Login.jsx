import { useState } from 'react';
import { loginUser, registerUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  // Estados do formulário
  const [email, setEmail] = useState('');      // Armazena o e-mail digitado
  const [password, setPassword] = useState(''); // Armazena a senha digitada
  const [error, setError] = useState('');       // Mensagem de erro
  const [success, setSuccess] = useState('');   // Mensagem de sucesso
  const [loading, setLoading] = useState(false); // Estado de carregamento

  // Função para login
  const handleLogin = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      setSuccess(data.success);
      // Salva dados do usuário no localStorage
      localStorage.setItem('uid', data.uid);
      localStorage.setItem('idToken', data.idToken);
      // Redireciona para a lista de tarefas
      navigate('/tasklist');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para criar conta
  const handleRegister = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = await registerUser(email, password);
      setSuccess(data.success);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Container centralizado vertical e horizontalmente
    <div className="d-flex justify-content-center align-items-center vh-100">
      
      {/* Card do formulário */}
      <div 
        className="card shadow p-4" 
        style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}
      >
        <div className="card-body">

          {/* Título do formulário */}
          <h2 className="card-title text-center mb-4">Entrar ou Criar Conta</h2>

          {/* Mensagens de erro e sucesso */}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {/* Campo de e-mail */}
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          {/* Campo de senha */}
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>

          {/* Botão de login */}
          <button 
            className="btn btn-primary w-100 mb-2" 
            onClick={handleLogin} 
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {/* Botão de criar conta */}
          <button 
            className="btn btn-outline-secondary w-100" 
            onClick={handleRegister} 
            disabled={loading}
          >
            {loading ? "Criando..." : "Criar Conta"}
          </button>

        </div>
      </div>
    </div>
  );
}
