import { Action } from "./interfaces/action.interface";
import { Todo } from "./interfaces/todo.interface";
export const todoReducer = (initialState: Todo[], action: Action): Todo[] => {
  
  switch (action?.type) {
    case 'Add Todo':
      return [...initialState, action?.payload];
    case 'Remove Todo':
      return initialState.filter(state => state.id !== action?.payload?.id)
    case 'Toggle Todo':
      return initialState.map( state => {
        if (state?.id === action?.payload?.id){
          return {
            ...state,
            done: !state?.done
          } 
        }
        return state;
      })
    default:
      return initialState;
  }
}
