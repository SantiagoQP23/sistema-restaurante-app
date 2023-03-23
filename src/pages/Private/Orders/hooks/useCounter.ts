import {useState} from 'react';

export const useCounter = (initialState = 1, step = 1, max?: number, min?: number) => {
  const [state, setstate] = useState(initialState);

  const increment = () => {
    setstate( state != max ? state + step : state);
  }

  const decrement = () => {
    
    setstate(state > 0 && state != min ? state - step : state);
  }

  return {
    state, increment, decrement, setCounter: setstate
  }
  
}
