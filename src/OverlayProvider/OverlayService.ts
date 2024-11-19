import { ERROR_MESSAGES } from './constants';
import { handlerType, IOverlayService, overlayInnerElementType } from './types';

/**
 * OverlayService provides functionality to manage overlays such as modals or drawers.
 * It allows adding overlay handlers, opening, and closing overlays by name.
 * The service maintains a private map of overlay handlers and updates their state when required.
 */
export class OverlayService implements IOverlayService {
  // Private map to store overlay handlers associated with their names.
  #overlayHandlers = new Map<any, handlerType>();

  /**
   * Registers an overlay handler for a specific overlay name.
   *
   * @param overlayName - The name of the overlay to register the handler for.
   * @param handler - The handler function to manage the overlay's state.
   */
  addOverlayHandler = (overlayName: string, handler: handlerType) => {
    this.#overlayHandlers.set(overlayName, handler);
  };

  /**
   * Updates the state of an overlay by its name.
   * If no handler is found for the given overlay name, an error is thrown.
   *
   * @param overlayName - The name of the overlay to update.
   * @param data - The data to update the overlay with (e.g., config, visibility, and inner element).
   * @throws Will throw an error if the overlay handler does not exist.
   */
  #updateOverlayByName(
    overlayName: string,
    data: {
      config?: any;
      overlayInnerElement?: overlayInnerElementType;
      visible: boolean;
    }
  ) {
    try {
      // Retrieve the handler for the overlay by name.
      let overlayHandler = this.#overlayHandlers.get(overlayName);

      // If the handler is not found, throw an error.
      if (!overlayHandler)
        throw `${overlayName} ${ERROR_MESSAGES.overlayDoesNotExist}`;

      // Update the overlay state using the handler.
      overlayHandler((prev) => {
        return {
          ...prev,
          ...data, // Merge the new data with the previous state.
        };
      });
    } catch (error) {
      // Log the error if the handler is not found or any other issue occurs.
      console.warn(error);
    }
  }

  /**
   * Opens the overlay with the specified name, inner element, and configuration.
   * This method makes the overlay visible and sets the inner element and config.
   *
   * @param overlayName - The name of the overlay to open.
   * @param overlayInnerElement - The element to render inside the overlay.
   * @param config - Optional configuration for the overlay (e.g., size, position, etc.).
   */
  openOverlay = <T = any>(
    overlayName: string,
    overlayInnerElement: overlayInnerElementType,
    config?: T
  ) => {
    // Update the overlay state to make it visible and set the content.
    this.#updateOverlayByName(overlayName, {
      overlayInnerElement,
      config: config || null,
      visible: true,
    });
  };

  /**
   * Closes the overlay with the specified name, making it invisible.
   *
   * @param overlayName - The name of the overlay to close.
   */
  closeOverlay = (overlayName: string) => {
    // Update the overlay state to hide it.
    this.#updateOverlayByName(overlayName, {
      visible: false,
    });
  };
}
