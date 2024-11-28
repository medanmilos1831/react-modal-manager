export interface IOverlayService {
  subscribe(overlayName: string, entry: entryType): void;
  unsubscribe: (overlayName: string) => void;
  getData: (overlayName: string) => any;
  overlayHandler: (params: overlayHandlerParam) => void;
}

export interface IOverlayContext {
  service: IOverlayService;
}

export type setVisibleType = React.Dispatch<React.SetStateAction<boolean>>;

export type overlayHandlerParam = {
  overlayName: string;
  open: boolean;
  data?: any;
};

export type entryType = { setVisible: setVisibleType; data: any };
