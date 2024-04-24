import React, { createContext } from "react";
import { useInterpret } from "@xstate/react";
import { MachineInterpreter, creativiaMachine } from "./CreativiaMachine";

interface CreativiaContext {
  creativiaService: MachineInterpreter;
}

export const CreativiaContext = createContext<CreativiaContext>(
  {} as CreativiaContext
);

export const CreativiaProvider: React.FC = ({ children }) => {
  const creativiaService = useInterpret(
    creativiaMachine
  ) as unknown as MachineInterpreter;

  return (
    <CreativiaContext.Provider value={{ creativiaService }}>
      {children}
    </CreativiaContext.Provider>
  );
};
