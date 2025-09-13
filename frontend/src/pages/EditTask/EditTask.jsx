import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateTask } from '../../services/task';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Button, Form, Alert } from 'react-bootstrap';

export default function EditTask() {
  const location = useLocation();   // Permite acessar dados passados via navigate
  const navigate = useNavigate();   // Permite redirecionamento
  const task = location.state?.task; // Recupera a tarefa enviada para edição

  // Estados dos campos do formulário
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate).toISOString().slice(0,16) : '');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [error, setError] = useState('');

  // Se não existir tarefa, mostra mensagem e sidebar
  if (!task) {
    return (
      <div className="d-flex">
        <Sidebar />
        <div className="p-4">Tarefa não encontrada!</div>
      </div>
    );
  }

  // Função de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validação básica do título
    if (!title.trim()) {
      setError('O título é obrigatório');
      return;
    }

    const dueDateObj = dueDate ? new Date(dueDate) : null;

    try {
      await updateTask(task.id, {
        title,
        description,
        dueDate: dueDateObj ? dueDateObj.toISOString() : null,
        completed
      });
      navigate('/tasklist'); // Redireciona para a lista de tarefas
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <h1>Editar Tarefa</h1>
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

          {/* Campo data e hora */}
          <Form.Group className="mb-2">
            <Form.Label>Prazo</Form.Label>
            <Form.Control 
              type="datetime-local" 
              value={dueDate} 
              onChange={e => setDueDate(e.target.value)} 
            />
          </Form.Group>

          {/* Checkbox de concluída */}
          <Form.Group className="mb-3">
            <Form.Check 
              type="checkbox" 
              label="Concluída" 
              checked={completed} 
              onChange={e => setCompleted(e.target.checked)}
            />
          </Form.Group>

          {/* Botões */}
          <Button type="submit" variant="primary">Salvar</Button>
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