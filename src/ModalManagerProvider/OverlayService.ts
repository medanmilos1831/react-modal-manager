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
  uiHandlersMap = new Map();
  active = null;

  constructor(overlays: IOverlay[]) {
    overlays.forEach(({ overlayName }) => {
      this.overlaysMap[overlayName] = {
        overlayElement: null,
        config: null,
        visible: false,
      };
    });
  }

  setHandler = (handler: handlerType, overlayName: string) => {
    this.uiHandlersMap.set(overlayName, () => {
      handler((prev) => ++prev);
    });
  };

  updateUI(elementName: string) {
    this.uiHandlersMap.get(elementName)();
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
    this.updateUI(elementName);
  };
  close = (elementName: string) => {
    this.overlaysMap[elementName].visible = false;
    this.updateUI(elementName);
  };
}
