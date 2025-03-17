import { createSlice, nanoid } from "@reduxjs/toolkit"; // nanoid is a function that generates a unique ID

const initialState = { // initial by-default state of the slice(reducer)
    todos: [
        { id: "1", text: "Hello world"},
    ]
}

export const todoSlice = createSlice({
    name: "todo", // name of the slice 
    initialState,
    reducers: { // key-functions that update the state
        addTodo: (state, action) => {
            const currTodo = {
                id: nanoid(),
                text: action.payload,
            }
            state.todos.push(currTodo) // push the new todo to the todos array, prev state is preserved automatically
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload) // overwrite the todos array with the filtered array
        }
    }
})

export const { addTodo, removeTodo } = todoSlice.actions

export const todoReducer = todoSlice.reducer // store only allows to update the state through reducers registered in the store