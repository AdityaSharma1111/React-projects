
import { useEffect, useState } from 'react'
import './App.css'
import { Todoprovider } from './Contexts/TodoContext'
import { TodoForm, TodoItem } from './Components'

function App() {
  const [todos, setTodos] = useState([]) // todos is an array of objects

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) => {
    // The .map() function replaces the old object that needs to be changed with a new object, while keeping all other objects unchanged.
    // It returns a new array with modifications applied to specific elements.
    setTodos((prev) => (prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))) 
  }
  
  const deleteTodo = (id) => {
    setTodos((prev) => (prev.filter((todo) => (todo.id !== id))))
  }

  const toggleTodo = (id) => {
    // setTodos((prev) => (prev.map((prevTodo) => (prevTodo.id === id ? prevTodo.completed = !prevTodo.completed : prevTodo))))
    setTodos((prev) => 
      prev.map((prevTodo) => 
        prevTodo.id === id ? { ...prevTodo, 
          completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => { // useEffect to get todos from localStorage
    // localStorage stores key-value pairs as strings
    const todos = JSON.parse(localStorage.getItem("todos")) // get todos from localStorage 

    if(todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => { // useEffect to save todos to localStorage
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]) 

  return (
    <Todoprovider value={{todos, addTodo, updateTodo, deleteTodo, toggleTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full bg-slate-500 max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
              {/* Todo form goes here */} 
              <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {/* avoid using index as key */}
              {todos.map((todo) =>(
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  )
}

export default App
