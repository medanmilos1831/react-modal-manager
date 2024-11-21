import { ReactNode, useEffect, useRef, useState } from 'react';
import { handlerType, overlayComponentType, overlayEntityType } from './types';

/**
 * The `OverlaySubscriber` component is responsible for subscribing to overlay state changes
 * and rendering the appropriate overlay content based on the state.
 *
 * It listens for state updates (e.g., overlay visibility, content, configuration)
 * and renders the children with the updated overlay state.
 *
 * @param children - A function that receives the current overlay state as a parameter
 * and returns a ReactNode. The `children` function is used to render the overlay's content.
 * @param subscribe - A function to subscribe to the overlay state. It accepts a handler (setState)
 * to update the component's state when the overlay state changes.
 * @param Overlay - The overlay component type that will be rendered as part of the overlay.
 */
const OverlaySubscriber = ({
  children,
  subscribe,
}: {
  children: (state: overlayEntityType) => ReactNode;
  subscribe: (handler: handlerType) => void;
}) => {
  // State to store the current overlay entity details (inner element, config, visibility, etc.)
  const [state, setState] = useState<overlayEntityType>({
    overlayInnerElement: null,
    config: null,
    visible: false,
  });

  // Ref to track the initial render to avoid multiple subscriptions
  const init = useRef(false);

  // Subscribe to state changes once during the component's lifecycle
  if (init.current === false) {
    subscribe(setState); // Subscribes the state update handler
    init.current = true;
  }

  useEffect(() => {
    // Cleanup logic: reset overlay content when it is no longer visible
    return () => {
      if (state.visible && (state.config || state.overlayInnerElement)) {
        state.config = null;
        state.overlayInnerElement = null;
      }
    };
  }, [state]); // Runs cleanup when `state` changes

  // Render the children component, passing the current state as props
  return <>{children(state)}</>;
};

export { OverlaySubscriber };
