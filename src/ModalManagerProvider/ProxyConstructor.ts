import { IOverlayItem, overlayEntityMapType } from './types';

export abstract class ProxyConstructor {
  static createProxy = (
    overlays: IOverlayItem[],
    notify: (prop: string) => void
  ) => {
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
    return new Proxy(overlaysMap, {
      set: (target: overlayEntityMapType, prop: string, newValue) => {
        target[prop] = newValue;
        notify(prop);
        return Reflect.set(target, prop, newValue);
      },
    });
  };
}
