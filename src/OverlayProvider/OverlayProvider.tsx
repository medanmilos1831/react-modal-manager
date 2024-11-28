import {
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { OverlayContext } from './OverlayContext';
import { OverlayService } from './OverlayService';

/**
 * Provides an overlay service for managing modals or overlays in the application.
 * Wraps child components with an `OverlayContext` provider.
 * @param {PropsWithChildren} props - The children components to be wrapped by the provider.
 * @returns {JSX.Element} The context provider wrapping its children.
 */
function OverlayProvider({ children }: PropsWithChildren) {
  // Initialize the OverlayService instance and store it in state.
  const [service, _] = useState(init);

  /**
   * Initializes a new instance of the OverlayService.
   * @returns {OverlayService} The initialized service instance.
   */
  function init() {
    return new OverlayService();
  }

  return (
    <OverlayContext.Provider
      value={{
        service,
      }}
    >
      <>{children}</>
    </OverlayContext.Provider>
  );
}

/**
 * Represents an item managed by the OverlayProvider.
 * Renders its children and manages visibility and data for a specific overlay.
 * @param {Object} props - The properties of the item.
 * @param {string} props.overlayName - The unique name of the overlay.
 * @param {Function} props.children - A render function that receives overlay state and data.
 * @returns {ReactNode} The rendered overlay item.
 */
OverlayProvider.Item = ({
  overlayName,
  children,
}: {
  overlayName: string;
  children: (obj: { open: boolean; data: any }) => ReactNode;
}) => {
  // State to manage visibility of the overlay.
  const [visible, setVisible] = useState<boolean>(false);

  // Ref to ensure subscription happens only once.
  const init = useRef(false);

  // Access the overlay service from context.
  const { service } = useContext(OverlayContext)!;

  // Subscribe to the overlay service if not already subscribed.
  if (init.current === false) {
    service.subscribe(overlayName, {
      setVisible,
      overlayData: undefined,
    });
    init.current = true;
  }

  // Clean up subscription on component unmount.
  useEffect(() => {
    return () => {
      service.unsubscribe(overlayName);
    };
  }, []);

  // Pass visibility and data to the child render function.
  return children({
    open: visible,
    data: service.getOverlayData(overlayName),
  });
};

/**
 * Custom hook to access the overlay handler function from the OverlayService.
 * Allows components to open or close overlays programmatically.
 * @returns {Function} The `overlayHandler` function from OverlayService.
 */
const useOverlay = () => {
  const { service } = useContext(OverlayContext)!;
  return service.overlayHandler;
};

export { OverlayProvider, useOverlay };
