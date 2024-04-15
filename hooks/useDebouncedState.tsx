import { useEffect, useState } from 'react';

function useDebouncedState<T>(initialState: T | (() => T), delay: number = 0) {
  const [actualState, setActualState] = useState(initialState);
  const [debouncedState, setDebouncedState] = useState(initialState);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedState(actualState);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [actualState]);

  return [debouncedState, actualState, setActualState] as const;
}

export default useDebouncedState;