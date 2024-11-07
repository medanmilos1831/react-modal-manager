import { ReactNode } from 'react';

export interface IModalService {
  handler: any;
  modalElement: modalElementType;
  config: any;
  setHandler(handler: handlerType): void;
  // open<T = unknown>(component: modalElementType, config?: T): void;
  open: any;
  // close(): void;
  close: any;
  overlaysMap: any;
}

export type modalElementType = ReactNode | null;

export type handlerType = React.Dispatch<
  React.SetStateAction<{
    [key: string]: boolean;
  }>
>;

export type modalRenderType<C = any> = (obj: {
  open: boolean;
  Element: () => modalElementType;
  config: C;
}) => ReactNode;

export interface IOverlay {
  overlayName: string;
  OverlayElement: (obj: {
    open: boolean;
    Element: () => modalElementType;
    config: any;
  }) => ReactNode;
}

export type overlayMapType = {
  [key: string]: {
    overlayElement: ReactNode | null;
    config: any;
  };
};
