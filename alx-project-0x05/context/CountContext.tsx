import { createContext, useContext, useState, ReactNode } from "react";

// ✅ Define the correct interface
interface CountContextProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// ✅ Create the context using the interface
export const CountContext = createContext<CountContextProps | undefined>(undefined);

// ✅ Provider component
export const CountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => (count > 0 ? count - 1 : 0));

  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  );
};

// ✅ Custom hook for using the context
export const useCount = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be within a Count Provider");
  }
  return context;
};
