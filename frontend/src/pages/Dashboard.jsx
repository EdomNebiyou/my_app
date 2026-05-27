import { useEffect, useState } from "react"

import api from "../lib/axios"

import { useAuth } from "../context/AuthContext"

function Dashboard() {
  const { user, logout } = useAuth()

  const [tasks, setTasks] = useState([])

  const [title, setTitle] = useState("")

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks")

        setTasks(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const createTask = async (e) => {
    e.preventDefault()

    if (!title.trim()) return

    try {
      const res = await api.post("/tasks", {
        title
      })

      setTasks([res.data, ...tasks])

      setTitle("")
    } catch (error) {
      console.log(error)
    }
  }

  const toggleTask = async (id, completed) => {
    try {
      const res = await api.put(`/tasks/${id}`, {
        completed: !completed
      })

      setTasks(
        tasks.map((task) =>
          task._id === id ? res.data : task
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)

      setTasks(
        tasks.filter((task) => task._id !== id)
      )
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              TaskFlow over🚀
            </h1>

            <p className="text-zinc-400 mt-2">
              Welcome {user?.name}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={createTask}
          className="flex gap-3 mb-8"
        >
          <input
            type="text"
            placeholder="New task..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="flex-1 bg-zinc-900 p-3 rounded outline-none"
          />

          <button
            className="bg-blue-600 px-6 rounded"
          >
            Add
          </button>
        </form>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-zinc-900 p-4 rounded flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleTask(
                      task._id,
                      task.completed
                    )
                  }
                />

                <p
                  className={
                    task.completed
                      ? "line-through text-zinc-500"
                      : ""
                  }
                >
                  {task.title}
                </p>
              </div>

              <button
                onClick={() =>
                  deleteTask(task._id)
                }
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}

          {!tasks.length && (
            <p className="text-zinc-500 text-center">
              No tasks yet
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard