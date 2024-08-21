import { createContext } from 'react';
import { IModalManagerContext } from './types';

export const ModalManagerContext = createContext<
  IModalManagerContext | undefined
>(undefined);
