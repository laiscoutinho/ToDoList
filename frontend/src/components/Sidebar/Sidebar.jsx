import { Link, useNavigate } from 'react-router-dom';
import routes from '../../routes/routes';
import { handleLogout } from '../../services/auth';

export default function Sidebar() {
  const navigate = useNavigate();

  // Filtra apenas as rotas protegidas (não públicas) que devem aparecer no sidebar,
  // exceto a rota de edição de tarefas, que não queremos exibir.
  const protectedRoutes = routes.filter(
    route => route.public === false && route.element && route.path !== '/edittask'
  );

  return (
    <div
      className="d-flex flex-column vh-100 p-3 bg-light border-end"
      style={{ width: '220px', minWidth: '200px' }} // Garante largura mínima para telas pequenas
    >
      {/* Título do Sidebar */}
      <h4 className="mb-4 text-center text-primary">Roadmap</h4>

      {/* Lista de navegação */}
      <ul className="nav nav-pills flex-column mb-auto">
        {protectedRoutes.map((route, index) => (
          <li key={index} className="nav-item">
            {/* Link para cada rota */}
            <Link
              to={route.path}
              className="nav-link d-flex justify-content-start"
              style={{ paddingLeft: '12px' }}
            >
              {route.title}
            </Link>
          </li>
        ))}

        {/* Botão de logout */}
        <li className="nav-item mt-2">
          <button
            className="nav-link btn btn-danger w-100"
            onClick={() => handleLogout(navigate)}
          >
            Sair
          </button>
        </li>
      </ul>
    </div>
  );
}
