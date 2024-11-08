import { ReactNode } from 'react';

export interface IOverlayService {
  subscribe(overlayName: string, handler: handlerType): void;
  open<T = any>(
    overlayName: string,
    component: overlayInnerElementType,
    config?: T
  ): void;
  close(overlayName: string): void;
  overlaysMap: overlayMapType;
}

export interface IOverlayItem<T = any> {
  overlayName: string;
  Overlay: overlayComponentType<T>;
}

export type overlayMapType = {
  [key: string]: {
    overlayInnerElement: overlayInnerElementType;
    config: any;
    visible: boolean;
    Overlay: overlayComponentType;
  };
};

type overlayComponentType<T = any> = (obj: {
  open: boolean;
  Element: () => overlayInnerElementType;
  config: T;
}) => ReactNode;

export type overlayInnerElementType = ReactNode | null;

export type handlerType = React.Dispatch<React.SetStateAction<number>>;
