import { useCallback, useState } from 'react';

export function useToggle(
  initialValue = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => setValue(v => !v), []);
  const setToggle = useCallback((value: boolean) => setValue(value), []);

  return [value, toggle, setToggle];
}
