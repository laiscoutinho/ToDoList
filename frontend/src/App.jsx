import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import Card from './components/Card/Card.jsx'
import Popup from './components/Popup/Popup.jsx'
import CreateTask from './components/CreateTask/CreateTask.jsx'
import './App.css'

import { getTasks } from '../src/services/taskService.js'

function App() {
  const [tasks, setTasks] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    async function loadTasks() {
      const data = await getTasks()  
      setTasks(data)
    }
    loadTasks()
  }, [])

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
          tasks.map(task => <Card key={task.id} task={task} />)
        )}
      </main>
      <footer>
        Todos os direitos reservados - LaisCoutinho &copy; 2025. Disponível em <code><a href="">github</a></code>.
      </footer>

      {isOpen && (
        <Popup onClose={() => setIsOpen(false)}>
          <CreateTask onCancel={() => setIsOpen(false)} />
        </Popup>
      )}
    </>
  )
}

export default App