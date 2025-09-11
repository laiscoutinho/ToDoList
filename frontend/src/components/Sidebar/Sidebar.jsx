import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="d-flex flex-column vh-100 p-3 bg-light border-end"
         style={{width: '220px'}}>
      <h4 className="mb-4">ListaTarefas</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">Tarefas</Link>
        </li>
      </ul>
    </div>
  )
}