export interface IOverlayService {
  addOverlayHandler(overlayName: string, handler: handlerType): void;
  getData: any;
  overlayHandler: any;
}

export interface IOverlayContext {
  service: IOverlayService;
}

export type handlerType = React.Dispatch<React.SetStateAction<boolean>>;
