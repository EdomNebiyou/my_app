import { useState } from "react"

import {
  Link,
  useNavigate
} from "react-router-dom"

import api from "../lib/axios"

import { useAuth } from "../context/AuthContext"

function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await api.post("/auth/login", form)
      // Safety check: Ensure res.data is an object before accessing properties
      const userData = res.data?.user || res.data
      setUser(userData)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-5"
      >
        <h1 className="text-white text-5xl font-bold">
          Login
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 p-4 rounded text-white outline-none focus:ring-2 focus:ring-blue-600"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 p-4 rounded text-white outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition p-4 rounded text-white font-medium"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-zinc-400 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login