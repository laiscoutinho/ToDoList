import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Bem-vindo à Lista de Tarefas</h1>
      <p className="lead">
        Organize seus compromissos de forma simples e segura.
      </p>
      <Link to="/login" className="btn btn-primary mt-3">
        Cadastro / Login
      </Link>
    </div>
  )
}
