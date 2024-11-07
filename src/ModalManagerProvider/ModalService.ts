import { handlerType, IModalService, modalElementType } from './types';

export class ModalService implements IModalService {
  handler: handlerType | undefined = undefined;
  modalElement: modalElementType = null;
  config: any = null;
  overlays: any = undefined;
  elementsService: any = {};

  constructor(overlays: any) {
    this.overlays = overlays;
    this.overlays.forEach((i: any) => {
      this.elementsService[i.elementName] = {
        modalElement: null,
        config: null,
      };
    });
  }

  setHandler = (handler: handlerType) => {
    this.handler = handler;
  };

  open = <T = unknown>(
    elementName: string,
    modalElement: modalElementType,
    config?: T
  ) => {
    this.elementsService[elementName].modalElement = modalElement;
    this.elementsService[elementName].config = config ? config : null;
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
