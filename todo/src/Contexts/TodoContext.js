import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: " Todo msg",
            completed: false,
        }
    ],
    addTodo: () => {},
    updateTodo: () => {},
    deleteTodo: () => {},
    toggleTodo: () => {}
});
// The createContext function does not manage state; it only provides a default context value.
// Context is meant to share data, not manage or modify it.
// The actual state and functions should be inside a stateful provider (like Todoprovider in your case).

export const useTodo = () => {
    return useContext(TodoContext);
}

export const Todoprovider = TodoContext.Provider;