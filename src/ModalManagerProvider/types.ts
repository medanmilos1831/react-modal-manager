import { ReactNode } from 'react';

export interface IOverlayService {
  subscribe(overlayName: string, handler: handlerType): void;
  open<T = any>(
    overlayName: string,
    component: overlayInnerElementType,
    config?: T
  ): void;
  close(overlayName: string): void;
  overlaysMap: overlayEntityMapType;
  overlaySubscriberOnChange: (overlayName: string) => () => () => void;
  getOverlayByName: (overlayName: string) => overlayEntityType;
}

export interface IOverlayContext {
  open: IOverlayService['open'];
  close: IOverlayService['close'];
}

export interface IOverlayItem<T = any> {
  overlayName: string;
  Overlay: overlayComponentType<T>;
}

type overlayEntityType = {
  overlayInnerElement: overlayInnerElementType;
  config: any;
  visible: boolean;
  Overlay: overlayComponentType;
};

export type overlayEntityMapType = {
  [key: string]: overlayEntityType;
};

type overlayComponentType<T = any> = (obj: {
  open: boolean;
  Element: () => overlayInnerElementType;
  config: T;
}) => ReactNode;

export type overlayInnerElementType = ReactNode | null;

export type handlerType = React.Dispatch<React.SetStateAction<number>>;
