import { createElement } from 'react';
import { ErrorHandling } from './ErrorHandling';
import { ProxyConstructor } from './ProxyConstructor';
import {
  handlerType,
  IOverlayService,
  IOverlayItem,
  overlayInnerElementType,
  overlayMapType,
} from './types';

export class OverlayService extends ErrorHandling implements IOverlayService {
  overlaysMap: overlayMapType = {};
  private subscribers = new Map();

  constructor(overlays: IOverlayItem[]) {
    super();
    this.overlaysMap = ProxyConstructor.createProxy(overlays, (prop: string) =>
      this.notify(prop)
    );
  }

  subscribe = (overlayName: string, handler: handlerType) => {
    this.subscribers.set(overlayName, () => {
      handler((prev) => ++prev);
    });
  };

  private notify = (elementName: string) => {
    this.subscribers.get(elementName)();
  };

  overlaySubscriberOnChange = (overlayName: string) => {
    return () => {
      return () => {
        if (
          !this.overlaysMap[overlayName].visible &&
          (this.overlaysMap[overlayName].config ||
            this.overlaysMap[overlayName].overlayInnerElement)
        ) {
          this.overlaysMap[overlayName].config = null;
          this.overlaysMap[overlayName].overlayInnerElement = null;
        }
      };
    };
  };

  getOverlayByName = (overlayName: string) => {
    return this.overlaysMap[overlayName];
  };

  open = <T = any>(
    elementName: string,
    overlayInnerElement: overlayInnerElementType,
    config?: T
  ) => {
    this.overlaysMap[elementName] = {
      ...this.overlaysMap[elementName],
      overlayInnerElement,
      config: config || null,
      visible: true,
    };
  };
  close = (elementName: string) => {
    this.overlaysMap[elementName] = {
      ...this.overlaysMap[elementName],
      visible: false,
    };
  };
}
