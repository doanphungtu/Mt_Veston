import {useState} from 'react';

export default function useBoolean(defaultValue) {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return {value, setValue, setTrue, setFalse};
}
