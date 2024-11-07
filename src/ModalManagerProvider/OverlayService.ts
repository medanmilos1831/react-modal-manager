import {
  handlerType,
  IOverlayService,
  IOverlay,
  modalElementType,
  overlayMapType,
} from './types';

export class OverlayService implements IOverlayService {
  handler: handlerType | undefined = undefined;
  overlaysMap: overlayMapType = {};

  constructor(overlays: IOverlay[]) {
    overlays.forEach(({ overlayName }) => {
      this.overlaysMap[overlayName] = {
        overlayElement: null,
        config: null,
      };
    });
  }

  setHandler = (handler: handlerType) => {
    this.handler = handler;
  };

  open = <T = any>(
    elementName: string,
    overlayElement: modalElementType,
    config?: T
  ) => {
    this.overlaysMap[elementName].overlayElement = overlayElement;
    this.overlaysMap[elementName].config = config ? config : null;
    this.handler!((prev: any) => {
      return {
        ...prev,
        [elementName]: true,
      };
    });
  };
  close = (elementName: string) => {
    this.handler!((prev: any) => {
      return {
        ...prev,
        [elementName]: false,
      };
    });
  };
}
