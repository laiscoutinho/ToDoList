import { Card, Badge, Button } from 'react-bootstrap';
import { Edit, CheckCircle, XCircle, Trash2 } from 'lucide-react';

// Reponsavel por renderizar uma tarefa

export default function TaskItem({ task, onEdit, onToggleCompleted, onDelete }) {
  return (
    <Card
      className="mb-3 shadow-sm task-card"
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <Card.Body>
        {/* Título da tarefa com tachado se concluída */}
        <Card.Title style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </Card.Title>

        {/* Descrição da tarefa com tachado se concluída */}
        <Card.Text style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.description}
        </Card.Text>

        {/* Informações de criação e prazo */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <small className="text-muted" style={{ fontSize: '0.85rem' }}>
            Criado em: {task.dateTime ? new Date(task.dateTime).toLocaleString() : '-'} | 
            Prazo: {task.dueDate ? new Date(task.dueDate).toLocaleString() : '-'}
          </small>

          {/* Badge indicando status da tarefa */}
          <Badge bg={task.completed ? 'success' : 'secondary'}>
            {task.completed ? 'Concluída' : 'Pendente'}
          </Badge>
        </div>

        {/* Botões de ação da tarefa */}
        <div className="d-flex gap-2 flex-wrap">
          {/* Botão de editar */}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onEdit(task)}
            title="Editar Tarefa"
          >
            <Edit size={16} />
          </Button>

          {/* Botão de marcar/desmarcar como concluída */}
          <Button
            variant={task.completed ? 'outline-warning' : 'outline-success'}
            size="sm"
            onClick={() => onToggleCompleted(task)}
            title={task.completed ? 'Marcar como não concluída' : 'Marcar como concluída'}
          >
            {task.completed ? <XCircle size={16} /> : <CheckCircle size={16} />}
          </Button>

          {/* Botão de deletar */}
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(task.id)}
            title="Deletar Tarefa"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
