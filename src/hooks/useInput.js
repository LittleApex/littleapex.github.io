import { useState } from "react";

export const useInput = (key) => {

  const [value, setValue] = useState(localStorage.getItem(key) ?? '');

  const onChange = event => {
    setValue(event.target.value);
    const value = event.target.value;
    localStorage.setItem(key, value);
  }

  const clear = () => {
    setValue('');
    localStorage.setItem(key, '');
  }

  return {value, onChange, clear};

}
