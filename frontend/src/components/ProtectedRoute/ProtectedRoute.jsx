import { Navigate } from 'react-router-dom';

// Responsavel por renderizar a rota apenas se haver usuario logado (ter id Token)
// se nao, ele volta pra rota de login.

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('idToken');  
  if (!token) return <Navigate to="/login" replace />;

  return children;
}
