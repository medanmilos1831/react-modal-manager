import { handlerType, IModalService, modalElementType } from './types';

export class ModalService implements IModalService {
  handler: handlerType | undefined = undefined;
  modalElement: modalElementType = null;
  config: any = null;

  setHandler = (handler: handlerType) => {
    this.handler = handler;
  };

  open = <T = unknown>(modalElement: modalElementType, config?: T) => {
    this.modalElement = modalElement;
    this.config = config ? config : null;
    this.handler!(true);
  };
  close = () => {
    this.handler!(false);
  };
  setConfig = (config: unknown) => {
    this.config = config;
  };
}
