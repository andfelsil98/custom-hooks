import { useReducer, useEffect } from "react";
import { todoReducer } from './todoReducer';
import { Action } from "../interfaces/action.interface";
import { Todo } from "../interfaces/todo.interface";

const initialState: Todo[] = [];

const init = () => {
  return JSON.parse(localStorage?.getItem('todos') ?? '[]');
}

export const useTodo = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])
  
  const handleNewTodo = (todo: Todo) => {
    const action: Action = {
      type: 'Add Todo',
      payload: todo
    };
    dispatch( action );
  };

  const handleDeleteTodo = (todo: Todo) => {
    const action: Action = {
      type: 'Remove Todo',
      payload: todo
    };
    dispatch( action );
  };

  const handleToggleTodo = (todo: Todo) => {
    const action: Action = {
      type: 'Toggle Todo',
      payload: todo
    };
    dispatch( action );
  }

  

  
  return {
    todos,
    todosCount: todos?.length,
    pendingTodosCount: todos?.filter(todo => !todo?.done)?.length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo
  }
}
