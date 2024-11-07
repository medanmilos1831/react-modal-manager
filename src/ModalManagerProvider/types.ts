import { ReactNode } from 'react';

export interface IModalService {
  handler: any;
  modalElement: modalElementType;
  config: any;
  setHandler(handler: handlerType): void;
  open<T = unknown>(
    overlayName: string,
    component: modalElementType,
    config?: T
  ): void;
  // open: any;
  close(overlayName: string): void;
  overlaysMap: any;
}

export type modalElementType = ReactNode | null;

export type handlerType = React.Dispatch<
  React.SetStateAction<{
    [key: string]: boolean;
  }>
>;

export interface IOverlay<T = any> {
  overlayName: string;
  Overlay: (obj: {
    open: boolean;
    Element: () => modalElementType;
    config: T;
  }) => ReactNode;
}

export type overlayMapType = {
  [key: string]: {
    overlayElement: ReactNode | null;
    config: any;
  };
};
