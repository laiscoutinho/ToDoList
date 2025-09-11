import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 text-center" style={{ maxWidth: '500px', borderRadius: '15px' }}>
        <div className="card-body">
          <h1 className="card-title mb-3" style={{ color: '#0d6efd' }}>
            Bem-vindo à Lista de Tarefas
          </h1>
          <p className="card-text mb-4">
            Organize seus compromissos de forma simples e segura.
          </p>
          <Link to="/login" className="btn btn-primary btn-lg">
            Cadastro / Login
          </Link>
        </div>
      </div>
    </div>
  )
}
