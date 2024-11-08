import { ErrorHandling } from './ErrorHandling';
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
    let overlaysMap = overlays.reduce((acc, { overlayName, Overlay }) => {
      return {
        ...acc,
        [overlayName]: {
          overlayInnerElement: null,
          config: null,
          visible: false,
          Overlay,
        },
      };
    }, {});
    this.overlaysMap = new Proxy(overlaysMap, {
      set: (target: overlayMapType, prop: string, newValue) => {
        target[prop] = newValue;
        this.notify(prop);
        return Reflect.set(target, prop, newValue);
      },
    });
  }

  subscribe = (overlayName: string, handler: handlerType) => {
    this.subscribers.set(overlayName, () => {
      handler((prev) => ++prev);
    });
  };

  private notify = (elementName: string) => {
    this.subscribers.get(elementName)();
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
