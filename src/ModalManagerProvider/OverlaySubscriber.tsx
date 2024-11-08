import { ReactNode, useEffect, useRef, useState } from 'react';
import { handlerType, overlayEntityType } from './types';

const OverlaySubscriber = ({
  children,
  subscribe,
  initState,
}: {
  children: (state: overlayEntityType) => ReactNode;
  subscribe: (handler: handlerType) => void;
  initState: overlayEntityType;
}) => {
  const [state, setState] = useState(initState);
  const init = useRef(false);
  if (init.current === false) {
    subscribe(setState);
    init.current = true;
  }
  useEffect(() => {
    return () => {
      if (state.visible && (state.config || state.overlayInnerElement)) {
        state.config = null;
        state.overlayInnerElement = null;
      }
    };
  }, [state]);
  return <>{children(state)}</>;
};

export { OverlaySubscriber };
