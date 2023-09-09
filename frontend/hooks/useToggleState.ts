import { useState, useCallback } from 'react';

/**
 * stateのトグルを行うカスタムフック
 * 
 * @param initialState 初期値
 * @returns [state, toggleState] state: 現在のstate, toggleState: stateをトグルする関数
 * @example
 * const [state, toggleState] = useToggleState(false);
 */
const useToggleState = (initialState: boolean) => {
  const [state, setState] = useState(initialState);

  const toggleState = useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  return [state, toggleState] as const;
};

export default useToggleState;