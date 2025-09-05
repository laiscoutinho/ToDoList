const BASE_URL = 'http://localhost:8080/tasks';

export async function getTasks() {
  try {
    const res = await fetch(BASE_URL);
    console.log(res)
    if (!res.ok) throw new Error('Erro ao buscar tarefas');
    return await res.json();
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return [];
  }
}

export async function addTask(taskData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    console.log(res)
    if (!res.ok) throw new Error('Erro ao adicionar tarefa');
    return await res.json();
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
    return null;
  }
}

export async function toggleTask(taskId) {
  try {
    const res = await fetch(`${BASE_URL}/${taskId}/toggle`, {
      method: 'PUT',
    });
    console.log(res)
    if (!res.ok) throw new Error('Erro ao alternar status da tarefa');
    return await res.json();
  } catch (error) {
    console.error('Erro ao alternar status da tarefa:', error);
    return null;
  }
}

export async function deleteTask(taskId) {
  try {
    const res = await fetch(`${BASE_URL}/${taskId}`, {
      method: 'DELETE',
    });
    console.log(res)
    if (!res.ok) throw new Error('Erro ao deletar tarefa');
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
  }
}