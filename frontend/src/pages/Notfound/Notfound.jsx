import { Link } from 'react-router-dom';

// Aparece se por acaso for pra uma rota a qual nao esta definida.

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light p-3">
      
      {/* Código de erro */}
      <h1 className="display-1 fw-bold text-danger">404</h1>

      {/* Mensagem principal */}
      <h2 className="mb-3">Página não encontrada</h2>

      {/* Texto explicativo */}
      <p className="mb-4 text-muted">
        A página que você está procurando não existe ou foi removida.
      </p>

      {/* Botão de retorno para a home */}
      <Link 
        to="/" 
        className="btn btn-primary"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
