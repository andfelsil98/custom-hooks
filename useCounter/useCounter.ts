import { useState } from "react"

export const useCounter = (initialValue: number = 10) => {
  
  const [counter, setCounter] = useState(initialValue);


  const increment = (value: number = 1) => setCounter(counter + value);
  const decrement = (value: number = 1) => {
    console.log("entra aca", counter);
    
    if (counter === 1) return;
    setCounter(counter - value);
  }
  const reset = () => setCounter(initialValue);
  
  return {
    counter,
    increment,
    decrement,
    reset
  }
} 