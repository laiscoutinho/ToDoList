import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createTask, getTasks } from '../../services/task';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Button, Form, Alert } from 'react-bootstrap';

export default function NewTask() {
  const location = useLocation(); // Permite acessar dados passados via navigate
  const navigate = useNavigate(); // Permite redirecionamento
  const userId = localStorage.getItem('uid'); // ID do usuário logado

  // Lista de tarefas já existentes (para validações)
  const [tasks, setTasks] = useState(location.state?.tasks || []);

  // Estados dos campos do formulário
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(''); // Mensagem de erro

  // Carrega tarefas do usuário caso não tenham sido passadas pelo state
  useEffect(() => {
    if (!location.state?.tasks) {
      getTasks(userId)
        .then(setTasks)
        .catch(console.error);
    }
  }, [location.state, userId]);

  // Função de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validação do título
    if (!title.trim()) return setError('O título é obrigatório');

    // Validação da data/hora
    if (!dueDate) return setError('Selecione uma data/hora válida');
    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime()) || dueDateObj < new Date()) {
      return setError('Selecione uma data/hora futura válida');
    }

    // Validação de duplicidade de título + data
    if (tasks.some(t => t.title === title && new Date(t.dueDate)?.getTime() === dueDateObj.getTime())) {
      return setError('Já existe uma tarefa com o mesmo título e prazo!');
    }

    try {
      // Cria a nova tarefa via back-end
      const newTask = await createTask({
        title,
        description,
        dueDate: dueDateObj.toISOString() // envia a data como string ISO
      });

      // Atualiza lista local
      setTasks([...tasks, newTask]);

      // Redireciona para a lista de tarefas
      navigate('/tasklist');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-grow-1 p-4">
        <h1>Nova Tarefa</h1>
        <hr />

        {/* Formulário */}
        <Form onSubmit={handleSubmit}>
          {/* Mensagem de erro */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Campo título */}
          <Form.Group className="mb-2">
            <Form.Label>Título</Form.Label>
            <Form.Control 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Digite o título da tarefa"
            />
          </Form.Group>

          {/* Campo descrição */}
          <Form.Group className="mb-2">
            <Form.Label>Descrição</Form.Label>
            <Form.Control 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Digite uma descrição"
            />
          </Form.Group>

          {/* Campo data/hora */}
          <Form.Group className="mb-2">
            <Form.Label>Prazo</Form.Label>
            <Form.Control 
              type="datetime-local" 
              value={dueDate} 
              onChange={e => setDueDate(e.target.value)} 
            />
          </Form.Group>

          {/* Botões */}
          <Button type="submit" variant="primary">Adicionar</Button>
          <Button 
            variant="secondary" 
            className="ms-2" 
            onClick={() => navigate('/tasklist')}
          >
            Cancelar
          </Button>
        </Form>
      </div>
    </div>
  );
}
