import { ReactNode } from 'react';

/**
 * Defines a service for managing overlays.
 * This interface provides methods for adding handlers,
 * opening and closing overlays.
 */
export interface IOverlayService {
  /**
   * Adds a handler for a specific overlay.
   *
   * @param overlayName - The name of the overlay to associate the handler with.
   * @param handler - The handler function used to update the overlay's state.
   */
  addOverlayHandler(overlayName: string, handler: handlerType): void;

  /**
   * Opens an overlay with a given name and component.
   *
   * @param overlayName - The name of the overlay to open.
   * @param component - The component to display inside the overlay.
   * @param config - An optional parameter for additional configuration.
   */
  openOverlay<T = any>(
    overlayName: string,
    component: overlayInnerElementType,
    config?: T
  ): void;

  /**
   * Closes an overlay by its name.
   *
   * @param overlayName - The name of the overlay to close.
   */
  closeOverlay(overlayName: string): void;
}

/**
 * Defines the context for accessing open and close overlay functions.
 */
export interface IOverlayContext {
  /**
   * Function to open an overlay.
   *
   * @param overlayName - The name of the overlay to open.
   * @param component - The component to be displayed inside the overlay.
   * @param config - An optional parameter for additional configuration.
   */
  open: IOverlayService['openOverlay'];

  /**
   * Function to close an overlay.
   *
   * @param overlayName - The name of the overlay to close.
   */
  close: IOverlayService['closeOverlay'];
}

/**
 * Represents an overlay item containing its name and component.
 *
 * @param overlayName - The name of the overlay represented by this item.
 * @param Overlay - The component that represents the overlay.
 */
export interface IOverlayItem<T = any> {
  overlayName: string;
  Overlay: overlayComponentType<T>;
}

/**
 * Type representing the state of an overlay, including visibility,
 * the inner element, and configuration data.
 */
export type overlayEntityType = {
  overlayInnerElement: overlayInnerElementType;
  config: any;
  visible: boolean;
};

/**
 * A map linking overlay names to their corresponding state.
 */
export type overlayEntityMapType = {
  [key: string]: overlayEntityType;
};

/**
 * Type defining a function to render an overlay component.
 * This function takes an object containing information about the visibility,
 * inner element, and configuration data for the overlay.
 *
 * @param open - Whether the overlay is open or not.
 * @param Element - A function that returns the inner element of the overlay.
 * @param config - The configuration for the overlay.
 */
export type overlayComponentType<T = any> = (obj: {
  open: boolean;
  Element: () => overlayInnerElementType;
  config: T;
}) => ReactNode;

/**
 * Type for the inner element of the overlay.
 * It can be any ReactNode or null if there is no inner element.
 */
export type overlayInnerElementType = ReactNode | null;

/**
 * Type defining a handler function for updating the overlay's state.
 * This handler uses React's Dispatch to allow state updates via React.SetStateAction.
 */
export type handlerType = React.Dispatch<
  React.SetStateAction<overlayEntityType>
>;
