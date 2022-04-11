import { useState } from 'react';

const useLocalStorage = (key, initialState) => {
  const getLocalStorage = () => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialState;
    } catch (e) {
      console.error(e);
      return initialState;
    }
  };

  const [storage, setStorage] = useState(getLocalStorage());

  const setLocalStorage = (value) => {
    try {
      setStorage(value);
      const parsedValue = JSON.stringify(value);
      localStorage.setItem(key, parsedValue);
    } catch (e) {
      console.error(e);
    }
  };
  return [storage, setLocalStorage];
};

export default useLocalStorage;
