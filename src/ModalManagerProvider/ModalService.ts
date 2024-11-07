import {
  handlerType,
  IModalService,
  IOverlay,
  modalElementType,
  overlayMapType,
} from './types';

export class ModalService implements IModalService {
  handler: handlerType | undefined = undefined;
  modalElement: modalElementType = null;
  config: any = null;
  // overlays: any = undefined;
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

  open = <T = unknown>(
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
