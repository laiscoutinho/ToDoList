import Sidebar from '../../components/Sidebar/Sidebar'
import TaskForm from '../../components/TaskForm/TaskForm'

export default function TaskList() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <h1>Minhas Tarefas</h1>
        <TaskForm />
        <hr />
      </div>
    </div>
  )
}
