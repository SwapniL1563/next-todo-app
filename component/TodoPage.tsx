'use client'
import { useEffect, useState } from "react"

type TodoType = {
  id: string
  title: string
  completed: boolean
}

export default function TodoPage() {
  const [title, setTitle] = useState("")
  const [todos, setTodos] = useState<TodoType[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('/api/todo')
      const data = await res.json()
      setTodos(data)
    }

    fetchTodos()
  }, [])

  const addTodo = async () => {
    const res = await fetch('/api/todo', {
      method: 'POST',
      body: JSON.stringify({ title }),
    })

    const data = await res.json()
    setTodos(prev => [...prev, data])
    setTitle("")
  }

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todo/${id}`, { method: 'DELETE' })
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const toggleComplete = async (id: string, completed: boolean) => {
    const res = await fetch(`/api/todo/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed: !completed })
    })

    const data = await res.json()
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, completed: data.completed } : todo))
    )
  }

  return (
    <div className="min-h-screen bg-blue-100 text-blue-900 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Todo List</h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-3 bg-blue-100 rounded-xl shadow-sm"
            >
              <span className={`text-lg ${todo.completed ? "line-through text-gray-500" : ""}`}>
                {todo.title}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(todo.id, todo.completed)}
                  className={`px-3 py-1 rounded-md font-medium ${
                    todo.completed
                      ? "bg-yellow-400 text-white hover:bg-yellow-500"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {todo.completed ? "Pending" : "Complete"}
                </button>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
