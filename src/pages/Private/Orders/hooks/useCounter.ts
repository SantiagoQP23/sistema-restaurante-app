import {useState} from 'react';

export const useCounter = (initialState = 1, step = 1, max?: number, min?: number) => {
  const [state, setCounter] = useState(initialState);

  const increment = () => {
    setCounter( state != max ? state + step : state);
  }

  const decrement = () => {
    
    setCounter(state > 0 && state != min ? state - step : state);
  }

  return {
    state, increment, decrement, setCounter
  }
  
}
