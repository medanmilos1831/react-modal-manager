import { createContext } from 'react';
import { IModalService } from './types';

export const ModalContext = createContext<IModalService | undefined>(undefined);
