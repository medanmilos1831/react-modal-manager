import { createContext } from 'react';
import { IOverlayService } from './types';

export const OverlayContext = createContext<IOverlayService | undefined>(
  undefined
);
