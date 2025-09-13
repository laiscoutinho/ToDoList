import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTasks, toggleTaskCompleted, deleteTask } from '../../services/task';  
import { Button, Spinner } from 'react-bootstrap';

import Sidebar from '../../components/Sidebar/Sidebar';
import TaskItem from '../../components/TaskItem/TaskItem';

export default function TaskList() {
  const navigate = useNavigate();
  const location = useLocation();

  // Inicializa as tasks a partir do estado passado via navegação ou vazio
  const initialTasks = location.state?.tasks || [];
  const [tasks, setTasks] = useState(initialTasks);
  const [loading, setLoading] = useState(true);  // Spinner enquanto carrega
  const [error, setError] = useState(null);      // Mensagens de erro

  const userId = localStorage.getItem('uid');

  // Busca tarefas do usuário ao montar o componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(userId);
        setTasks(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  // Navega para a página de criação de nova tarefa, passando estado atual
  const handleClick = () => {
    navigate('/newtask', { state: { tasks } }); 
  };

  // Navega para a página de edição de tarefa, passando a task selecionada
  const handleEdit = (task) => {
    navigate('/edittask', { state: { task } });
  };

  // Alterna status de concluída/não concluída
  const handleToggleCompleted = async (task) => {
    try {
      await toggleTaskCompleted(task.id, !task.completed);
      setTasks(tasks.map(t => 
        t.id === task.id ? { ...t, completed: !t.completed } : t
      ));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Deleta uma tarefa e atualiza a lista local
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal responsivo */}
      <div className="flex-grow-1 p-4">
        <h1>Minhas Tarefas</h1>
        <Button variant="primary" onClick={handleClick}>
          Nova Tarefa
        </Button>
        <hr />

        {/* Spinner de carregamento */}
        {loading && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {/* Exibição de erro */}
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {/* Lista de tarefas */}
        {!loading && !error && (
          <>
            {tasks.length === 0 ? (
              <p className="text-muted">Nenhuma tarefa cadastrada ainda!</p>
            ) : (
              tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onToggleCompleted={handleToggleCompleted}
                  onDelete={handleDelete}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
