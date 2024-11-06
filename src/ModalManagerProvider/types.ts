import { ReactNode } from 'react';

export interface IModalService {
  handler: handlerType | undefined;
  modalElement: modalElementType;
  config: any;
  setHandler(handler: handlerType): void;
  open<T = unknown>(component: modalElementType, config?: T): void;
  close(): void;
  setConfig(config: unknown): void;
}

export type modalElementType = ReactNode | null;

export type handlerType = React.Dispatch<React.SetStateAction<boolean>>;

export type modalRenderType<C = any> = (obj: {
  open: boolean;
  Element: () => modalElementType;
  config: C;
}) => ReactNode;
