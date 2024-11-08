import {
  handlerType,
  IOverlayService,
  IOverlayItem,
  overlayInnerElementType,
  overlayMapType,
} from './types';

export class OverlayService implements IOverlayService {
  overlaysMap: overlayMapType = {};
  private subscribers = new Map();

  constructor(overlays: IOverlayItem[]) {
    overlays.forEach(({ overlayName, Overlay }) => {
      this.overlaysMap[overlayName] = {
        overlayInnerElement: null,
        config: null,
        visible: false,
        Overlay,
      };
    });
  }

  subscribe = (overlayName: string, handler: handlerType) => {
    this.subscribers.set(overlayName, () => {
      handler((prev) => ++prev);
    });
  };

  private notify(elementName: string) {
    this.subscribers.get(elementName)();
  }

  open = <T = any>(
    elementName: string,
    overlayInnerElement: overlayInnerElementType,
    config?: T
  ) => {
    this.overlaysMap = {
      ...this.overlaysMap,
      [elementName]: {
        ...this.overlaysMap[elementName],
        overlayInnerElement,
        config: config || null,
        visible: true,
      },
    };
    this.notify(elementName);
  };
  close = (elementName: string) => {
    this.overlaysMap[elementName].visible = false;
    this.notify(elementName);
  };
}
