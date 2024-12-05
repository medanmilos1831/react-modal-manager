import {
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { OverlayContext } from './OverlayContext';
import { OverlayObserver } from './OverlayObserver';
import { overlayHandlerParam } from './types';

/**
 * Provides an overlay service for managing modals or overlays in the application.
 * Wraps child components with an `OverlayContext` provider.
 * @param {PropsWithChildren} props - The children components to be wrapped by the provider.
 * @returns {JSX.Element} The context provider wrapping its children.
 */
function OverlayProvider({ children }: PropsWithChildren) {
  // Initialize the OverlayObserver instance and store it in state.
  const [observer, _] = useState(init);

  /**
   * Initializes a new instance of the OverlayObserver.
   * @returns {OverlayObserver} The initialized service instance.
   */
  function init() {
    return new OverlayObserver();
  }

  return (
    <OverlayContext.Provider
      value={{
        observer,
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
  children: (obj: {
    open: boolean;
    overlayData: any;
    overlayHandler: (params: overlayHandlerParam) => void;
  }) => ReactNode;
}) => {
  const overlayHandler = useOverlay()!;
  // State to manage visibility of the overlay.
  const [visible, setVisible] = useState<boolean>(false);

  // Ref to ensure subscription happens only once.
  const init = useRef(false);

  // Access the overlay observer from context.
  const { observer } = useContext(OverlayContext)!;

  // Subscribe to the overlay observer if not already subscribed.
  if (init.current === false) {
    observer.subscribe(overlayName, {
      setVisible,
      overlayData: undefined,
    });
    init.current = true;
  }

  // Clean up subscription on component unmount.
  useEffect(() => {
    return () => {
      observer.unsubscribe(overlayName);
    };
  }, []);

  // Pass visibility and data to the child render function.
  return children({
    open: visible,
    overlayData: observer.getOverlayData(overlayName),
    overlayHandler,
  });
};

OverlayProvider.Handler = ({
  children,
}: {
  children: (
    overlayHandler: (params: overlayHandlerParam) => void
  ) => ReactNode;
}) => {
  const overlayHandler = useOverlay()!;
  return <>{children(overlayHandler)}</>;
};

/**
 * Custom hook to access the overlay handler function from the OverlayObserver.
 * Allows components to open or close overlays programmatically.
 * @returns {Function} The `overlayHandler` function from OverlayObserver.
 */
const useOverlay = () => {
  const { observer } = useContext(OverlayContext)!;
  return observer.overlayHandler;
};

export { OverlayProvider, useOverlay };
