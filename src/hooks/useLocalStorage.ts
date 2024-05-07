import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, defaultState: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultState;
    } catch (error) {
      console.error("useLocalStorage: Error parsing stored value", error);
      return defaultState;
    }
  });
  
  useEffect(() => {
    if (key === "") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("useLocalStorage: Error storing value", error);
    }
  }, [value, key]);

  return [value, setValue] as const;
};

export { useLocalStorage };

