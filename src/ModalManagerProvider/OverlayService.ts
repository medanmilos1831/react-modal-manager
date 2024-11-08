import { ErrorHandling } from './ErrorHandling';
import {
  handlerType,
  IOverlayService,
  overlayEntityMapType,
  overlayInnerElementType,
} from './types';

export class OverlayService extends ErrorHandling implements IOverlayService {
  private subscribers = new Map();

  constructor() {
    super();
  }

  subscribe = (overlayName: string, handler: handlerType) => {
    this.subscribers.set(overlayName, (data: overlayEntityMapType) => {
      handler((prev) => {
        return {
          ...prev,
          ...data,
        };
      });
    });
  };

  open = <T = any>(
    elementName: string,
    overlayInnerElement: overlayInnerElementType,
    config?: T
  ) => {
    this.subscribers.get(elementName)({
      overlayInnerElement,
      config: config || null,
      visible: true,
    });
  };
  close = (elementName: string) => {
    this.subscribers.get(elementName)({
      visible: false,
    });
  };
}
