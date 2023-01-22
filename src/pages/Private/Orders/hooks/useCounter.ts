import {useState} from 'react';

export const useCounter = (initialState = 1, max?: number, min?: number) => {
  const [state, setstate] = useState(initialState);

  const increment = () => {
    setstate( state != max ? state + 1 : state);
  }

  const decrement = () => {
    
    setstate(state > 0 && state != min ? state - 1 : state);
  }

  return {
    state, increment, decrement, setCounter: setstate
  }
  
}
