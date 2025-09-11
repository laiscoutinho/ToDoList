import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import TaskList from '../pages/TaskList/TaskList'
import Notfound from '../pages/Notfound/Notfound'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

const routes = [
  { path: '/', element: <Home />, public: true },
  { path: '/login', element: <Login />, public: true },
  { path: '*', element: <Notfound />, public: true },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <TaskList />
      </ProtectedRoute>
    ),
    public: false
  }
]

export default routes
