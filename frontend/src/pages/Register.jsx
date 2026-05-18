import { useState } from "react"

import { Link, useNavigate } from "react-router-dom"

import api from "../lib/axios"

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
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
      await api.post("/auth/register", form)
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
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
          Register
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm">
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 p-4 rounded text-white outline-none focus:ring-2 focus:ring-blue-600"
        />

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
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-zinc-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register