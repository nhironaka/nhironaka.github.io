import { createContext, useContext } from 'react';

import { type AddListener } from './useEvent';

export interface AzulContextType {
  players: 2 | 3 | 4;
  addListener: AddListener<string>;
  dispatch: (eventName: string, detail?: string) => void;
}

export const AzulContext = createContext<AzulContextType>({
  players: 2,
  addListener: () => () => undefined,
  dispatch: () => undefined,
});

export const useAzulContext = () => {
  const context = useContext(AzulContext);

  if (!context) {
    throw new Error('Cannot use context out of Azul');
  }

  return context;
};
