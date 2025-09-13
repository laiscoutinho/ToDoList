import { useState } from 'react';
import { loginUser, registerUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      setSuccess(data.success);
      localStorage.setItem('uid', data.uid);
      localStorage.setItem('idToken', data.idToken);
      navigate('/tasklist');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Entrar ou Criar Conta</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <button className="btn btn-primary w-100 mb-2" onClick={handleLogin} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <button className="btn btn-outline-secondary w-100" onClick={handleRegister} disabled={loading}>
            {loading ? "Criando..." : "Criar Conta"}
          </button>
        </div>
      </div>
    </div>
  );
}
