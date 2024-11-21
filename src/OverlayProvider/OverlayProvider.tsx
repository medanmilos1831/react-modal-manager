import { PropsWithChildren, useContext, useState } from 'react';
import { OverlayContext } from './OverlayContext';
import { OverlayService } from './OverlayService';
import { IOverlayItem } from './types';
import { OverlaySubscriber } from './OverlaySubscriber';

/**
 * `OverlayProvider` is a component that provides a service for managing open and close operations
 * of overlays. This component uses `OverlayService` to handle the overlay state and propagates it
 * through `OverlayContext`, making it accessible to all child components that use the `useOverlay` hook.
 *
 * @param children - The children components to be rendered within the provider.
 * @param overlays - A list of all overlays that will be tracked and displayed. Each overlay consists
 * of `overlayName` (a unique identifier for the overlay) and `Overlay` (the component to be rendered).
 *
 * @returns {JSX.Element} - A component that enables overlay management through context.
 */
function OverlayProvider<T extends IOverlayItem<any>[]>({
  children,
  overlays,
}: PropsWithChildren<{
  overlays: T;
}>) {
  // Initializes the OverlayService, which manages the open and close states of overlays
  const [service, _] = useState(init);

  // Function to initialize the OverlayService
  function init() {
    return new OverlayService();
  }

  return (
    <OverlayContext.Provider
      value={{
        open: service.openOverlay, // Function to open an overlay
        close: service.closeOverlay, // Function to close an overlay
      }}
    >
      <>
        {children}
        <>
          {overlays.map(({ overlayName, Overlay }) => {
            return (
              <OverlaySubscriber
                subscribe={(handler) => {
                  // Adds a handler for each overlay
                  service.addOverlayHandler(overlayName, handler);
                }}
                Overlay={Overlay}
              >
                {({ config, visible, overlayInnerElement, Overlay }) => {
                  return (
                    <Overlay
                      config={config || {}} // Provides default configuration if none is provided
                      open={visible} // Indicates whether the overlay is open
                      Element={() => overlayInnerElement} // Element to display inside the overlay
                    />
                  );
                }}
              </OverlaySubscriber>
            );
          })}
        </>
      </>
    </OverlayContext.Provider>
  );
}

/**
 * `useOverlay` is a custom hook that provides access to functions for opening and closing overlays
 * within components that use the `OverlayProvider`.
 *
 * @returns {Object} - An object containing `open` and `close` functions for overlay management.
 */
const useOverlay = () => {
  const { open, close } = useContext(OverlayContext)!;
  return {
    open, // Function to open an overlay
    close, // Function to close an overlay
  };
};

export { OverlayProvider, useOverlay };
