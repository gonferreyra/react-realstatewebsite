import React, { createContext } from "react";
import { useState } from "react";

export type Props = {
  isOpen: boolean;
  toogle: () => void;
};

export const ContextTest = createContext<Props>({} as Props);

export function Context({ children }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toogle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ContextTest.Provider value={{ isOpen, toogle }}>
      {children}
    </ContextTest.Provider>
  );
}

export default Context;
