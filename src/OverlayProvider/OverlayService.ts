import { entryType, IOverlayService, overlayHandlerParam } from './types';

export class OverlayService implements IOverlayService {
  #overlayHandlers = new Map<any, entryType>();

  subscribe = (overlayName: string, entry: entryType) => {
    this.#overlayHandlers.set(overlayName, entry);
  };

  unsubscribe = (overlayName: string) => {
    this.#overlayHandlers.delete(overlayName);
  };

  overlayHandler = ({
    overlayName,
    open,
    overlayData,
  }: overlayHandlerParam) => {
    let entry = this.#overlayHandlers.get(overlayName);
    if (!entry) return;
    entry.overlayData = overlayData;
    entry.setVisible(open);
  };
  getOverlayData = (overlayName: string) => {
    let entry = this.#overlayHandlers.get(overlayName);
    if (!entry) return undefined;
    return entry.overlayData;
  };
}
