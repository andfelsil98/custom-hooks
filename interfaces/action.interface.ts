import { Todo } from "./todo.interface";
export type Action = { type: 'Add Todo' | 'Remove Todo' | 'Toggle Todo', payload: Todo};
