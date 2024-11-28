/**
 * Interface for the Overlay Service, defining methods for managing overlays.
 */
export interface IOverlayService {
  /**
   * Subscribes to an overlay with a given name and handler entry.
   * @param {string} overlayName - The unique name of the overlay.
   * @param {entryType} entry - The handler containing visibility setter and data for the overlay.
   */
  subscribe(overlayName: string, entry: entryType): void;

  /**
   * Unsubscribes from an overlay by its name.
   * @param {string} overlayName - The unique name of the overlay to unsubscribe from.
   */
  unsubscribe: (overlayName: string) => void;

  /**
   * Retrieves the data associated with a specific overlay.
   * @param {string} overlayName - The unique name of the overlay.
   * @returns {any} - The data associated with the overlay, or `undefined` if not found.
   */
  getOverlayData: (overlayName: string) => any;

  /**
   * Handles overlay visibility and updates its associated data.
   * @param {overlayHandlerParam} params - The parameters for handling the overlay.
   */
  overlayHandler: (params: overlayHandlerParam) => void;
}

/**
 * Context for the Overlay Provider, providing access to the Overlay Service.
 */
export interface IOverlayContext {
  /**
   * The service instance for managing overlays.
   */
  service: IOverlayService;
}

/**
 * Type for the function used to set the visibility of an overlay.
 */
export type setVisibleType = React.Dispatch<React.SetStateAction<boolean>>;

/**
 * Parameters for the `overlayHandler` method, used to control overlays.
 */
export type overlayHandlerParam = {
  /**
   * The unique name of the overlay to be handled.
   */
  overlayName: string;

  /**
   * A boolean indicating whether the overlay should be visible (`true`) or hidden (`false`).
   */
  open: boolean;

  /**
   * Optional data to associate with the overlay.
   */
  overlayData?: any;
};

/**
 * Type defining the structure of an entry for an overlay.
 * This entry includes a setter for visibility and associated data.
 */
export type entryType = {
  /**
   * The function to update the visibility of the overlay.
   */
  setVisible: setVisibleType;

  /**
   * Data associated with the overlay, can be of any type.
   */
  overlayData: any;
};
