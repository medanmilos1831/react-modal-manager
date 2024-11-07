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
        visible: false,
      };
    });
  }

  setHandler = (handler: handlerType) => {
    this.handler = handler;
  };

  updateUI() {
    this.handler!((prev) => prev + 1);
  }

  open = <T = any>(
    elementName: string,
    overlayElement: modalElementType,
    config?: T
  ) => {
    this.overlaysMap = {
      ...this.overlaysMap,
      [elementName]: {
        overlayElement,
        config: config || null,
        visible: true,
      },
    };
    this.updateUI();
  };
  close = (elementName: string) => {
    this.overlaysMap[elementName].visible = false;
    this.handler!((prev) => prev + 1);
    this.updateUI();
  };
}
