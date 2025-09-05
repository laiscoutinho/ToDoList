import { useState } from 'react'
import { Plus } from 'lucide-react';
import Card from './components/Card/Card.jsx'
import Popup from './components/Popup/Popup.jsx'
import CreateTask from './components/CreateTask/CreateTask.jsx'
import './App.css'

function App() {

  const [tasks, setTasks] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  function addTask(taskData) {
    const newTask = {
      id: Date.now(),
      ...taskData
    }
    setTasks((prev) => [...prev, newTask])
    setIsOpen(false) 
  }

  return (
    <>
      <header>
        <h1>ToDo List</h1>
        <button onClick={() => setIsOpen(true)}>
          <Plus size={20} />
          Nova tarefa
        </button>
      </header>
      <main className="card">
        {tasks.length === 0 ? (
          <div className="empty">
            <p>Você ainda não tem tarefas cadastradas. <strong>Clique em "Nova tarefa"</strong></p>
          </div>
        ) : (
          tasks.map(task => (
            <Card key={task.id} task={task} />
          ))
        )}
      </main>
      <footer>
        Todos os direitos reservados - LaisCoutinho &copy; 2025. Disponivel em <code> <a href=""> github</a></code>.
      </footer>

      {isOpen && (
        <Popup onClose={() => setIsOpen(false)}>
          <CreateTask
            onSubmit={addTask}
            onCancel={() => setIsOpen(false)}
          />
        </Popup>
      )}
    </>
  )
}

export default App