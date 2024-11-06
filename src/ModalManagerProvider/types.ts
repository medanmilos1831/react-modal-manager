import { ReactNode } from 'react';

export interface IModalService {
  handler: handlerType | undefined;
  modalElement: modalElementType;
  config: unknown | null;
  setHandler(handler: handlerType): void;
  open<T = unknown>(component: modalElementType, config?: T): void;
  close(): void;
}

export type modalElementType = ReactNode | null;

export type handlerType = React.Dispatch<React.SetStateAction<boolean>>;
