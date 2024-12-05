import { ERROR_MESSAGES } from './constants';
import { entryType, IOverlayObserver, overlayHandlerParam } from './types';

/**
 * A service for managing overlays, providing methods for subscribing,
 * unsubscribing, handling overlay state, and retrieving overlay data.
 */
export class OverlayObserver implements IOverlayObserver {
  // Private map to store overlay handlers, keyed by overlay names.
  #overlayHandlers = new Map<string, entryType>();

  /**
   * Subscribes to an overlay by its name and registers a handler for managing its state.
   * @param {string} overlayName - The unique name of the overlay.
   * @param {entryType} entry - The handler containing visibility setter and data.
   */
  subscribe = (overlayName: string, entry: entryType) => {
    this.#overlayHandlers.set(overlayName, entry);
  };

  /**
   * Unsubscribes from an overlay by removing its handler.
   * @param {string} overlayName - The unique name of the overlay to unsubscribe from.
   */
  unsubscribe = (overlayName: string) => {
    this.#overlayHandlers.delete(overlayName);
  };

  /**
   * Handles opening or closing an overlay and updates its data.
   * If the overlay is not registered, a warning is logged.
   * @param {overlayHandlerParam} params - The parameters for the overlay operation.
   * @param {string} params.overlayName - The unique name of the overlay.
   * @param {boolean} params.open - Whether to open or close the overlay.
   * @param {any} [params.overlayData] - Optional data to associate with the overlay.
   */
  overlayHandler = ({
    overlayName,
    open,
    overlayData,
  }: overlayHandlerParam) => {
    const entry = this.#overlayHandlers.get(overlayName);
    if (!entry) {
      console.warn(
        `Overlay ${overlayName} ${ERROR_MESSAGES.overlayDoesNotExist}`
      );
      return;
    }
    // Update the overlay's data and visibility.
    entry.overlayData = overlayData;
    entry.setVisible(open);
  };

  /**
   * Retrieves the data associated with a specific overlay.
   * @param {string} overlayName - The unique name of the overlay.
   * @returns {any | undefined} The data associated with the overlay, or undefined if not found.
   */
  getOverlayData = (overlayName: string) => {
    const entry = this.#overlayHandlers.get(overlayName);
    if (!entry) return undefined;
    return entry.overlayData;
  };
}
