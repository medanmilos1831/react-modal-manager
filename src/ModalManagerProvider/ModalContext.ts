import { createContext } from 'react';
import { ModalService } from './ModalService';

export const ModalContext = createContext<ModalService | undefined>(undefined);
