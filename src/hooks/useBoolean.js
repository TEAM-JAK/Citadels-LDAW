import {useCallback, useState} from 'react';

export default function useBoolean(initialState) {
  const [value, setValue] = useState(initialState);

  return {
    value,
    set: setValue,
    toggle: useCallback(() => setValue(!value), []),
    setTrue: useCallback(() => setValue(true), []),
    setFalse: useCallback(() => setValue(false), []),
  };
}
