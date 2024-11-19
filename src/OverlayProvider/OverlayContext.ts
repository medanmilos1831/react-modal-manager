import { createContext } from 'react';
import { IOverlayContext } from './types';

export const OverlayContext = createContext<IOverlayContext | undefined>(
  undefined
);
