import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoREducer";


export const useTodo = () => {
    const initialState = [
        {
            id:  new Date().getTime(),
            description: 'Recolectar la pedra del alma',
            done: false
        },
        {
            id:  new Date().getTime() * 3,
            description: 'Recolectar la pedra del tiempo',
            done: false
        },
    ];

    const init = () => {
        return JSON.parse(localStorage.getItem('todos') || []);
    }
    
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
    
    const handleNewTodo = (todo) => {
        const action = { 
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch(action);
    }
    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }
    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }
    const todoCount = todos.length;

    const pendingTodosCount = todos.filter(todo => !todo.done).length;
    
  return {
    todos,
    todoCount,
    pendingTodosCount,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo
  }
}
