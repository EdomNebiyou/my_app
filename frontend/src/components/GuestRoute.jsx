import { Navigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

function GuestRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" />
  }

  return children
}

export default GuestRoute