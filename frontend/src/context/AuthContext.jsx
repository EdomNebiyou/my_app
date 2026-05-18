import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

import api from "../lib/axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me")
        // Safety check: Ensure res.data is an object before accessing properties
        const userData = res.data?.user || res.data
        setUser(userData)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    // Intercept 401 errors globally
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setUser(null)
        }
        return Promise.reject(error)
      }
    )

    fetchMe()

    return () => {
      api.interceptors.response.eject(interceptor)
    }
  }, [])

  const logout = async () => {
    try {
      await api.post("/auth/logout")

      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext)
}