import { handlerType, IOverlayService } from './types';

export class OverlayService implements IOverlayService {
  #overlayHandlers = new Map<
    any,
    {
      handler: handlerType;
      data: any;
    }
  >();

  addOverlayHandler = (overlayName: string, handler: handlerType) => {
    this.#overlayHandlers.set(overlayName, { handler, data: undefined });
  };

  overlayHandler = ({
    overlayName,
    open,
    data,
  }: {
    overlayName: string;
    open: boolean;
    data: any;
  }) => {
    let obj: any = this.#overlayHandlers.get(overlayName);
    obj.data = data;
    obj.handler(open);
  };
  getData = (overlayName: string) => {
    let { data }: any = this.#overlayHandlers.get(overlayName);
    return data;
  };
}
