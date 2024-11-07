import { ReactNode } from 'react';

export interface IOverlayService {
  handler: handlerType | undefined;
  setHandler(handler: handlerType): void;
  open<T = unknown>(
    overlayName: string,
    component: modalElementType,
    config?: T
  ): void;
  close(overlayName: string): void;
  overlaysMap: overlayMapType;
}

export type modalElementType = ReactNode | null;

export type handlerType = React.Dispatch<React.SetStateAction<number>>;

export interface IOverlay<T = unknown> {
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
    config: unknown;
    visible: boolean;
  };
};
