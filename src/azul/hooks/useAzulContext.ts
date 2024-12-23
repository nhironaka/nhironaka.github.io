import { createContext, useContext } from 'react';

import { BoardState } from '../services/board';

import { type AddListener } from './useEvent';

export interface AzulContextType {
  players: 2 | 3 | 4;
  game: BoardState;
  addListener: AddListener<string>;
  dispatch: (eventName: string, detail?: string) => void;
}

export const AzulContext = createContext<AzulContextType>({
  players: 2,
  game: new BoardState(2),
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
