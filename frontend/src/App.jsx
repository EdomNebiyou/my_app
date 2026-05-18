import {
  Navigate,
  Route,
  Routes
} from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"

import ProtectedRoute from "./components/ProtectedRoute"
import GuestRoute from "./components/GuestRoute"

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  )
}

export default App