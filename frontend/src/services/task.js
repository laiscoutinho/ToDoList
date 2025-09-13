const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Responsavel por definir todas as funções de requisições sobre tarefas.


// Buscar todas as tarefas do usuário
export const getTasks = async (userId) => {
  const res = await fetch(`${API_URL}/tarefas`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'userId': userId
    }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch tasks');
  console.log("Lista de tarefas pego com sucesso!");
  return data;
};


// Criar uma tarefa do usuário
export const createTask = async (task) => {
  const res = await fetch(`${API_URL}/tarefas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('idToken')}`,
      'userId': localStorage.getItem('uid') 
    },
    body: JSON.stringify(task)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create task');
  console.log("Tarefa criada com sucesso!");
  return data;
};


// Deletar/Apagar uma tarefa do usuário
export const deleteTask = async (taskId) => {
  const res = await fetch(`${API_URL}/tarefas/${taskId}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to delete task');
  }
  console.log("Tarefa deletada com sucesso!");
  return true;
};


// Editar uma tarefa do usuário
export const updateTask = async (taskId, task) => {
  const res = await fetch(`${API_URL}/tarefas/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update task');
  console.log("Tarefa alterada com sucesso!");
  return data;
};


// Alternar status de conclusão da tarefa do usuário
export const toggleTaskCompleted = async (taskId, completed) => {
  const res = await fetch(`${API_URL}/tarefas/${taskId}/concluir?completed=${completed}`, {
    method: 'PATCH'
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Failed to toggle task completed');
  }
  console.log("Tarefa mudado de estado com sucesso!");
  return true;
};

