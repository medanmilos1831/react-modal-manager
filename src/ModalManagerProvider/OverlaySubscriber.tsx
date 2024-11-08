import { ReactNode, useEffect, useRef, useState } from 'react';
import { handlerType, overlayEntityType } from './types';

const OverlaySubscriber = ({
  children,
  onChange,
  subscribe,
  initState,
}: {
  children: (state: overlayEntityType) => ReactNode;
  onChange: () => () => void;
  subscribe: (handler: handlerType) => void;
  initState: overlayEntityType;
}) => {
  const [state, setState] = useState(initState);
  const init = useRef(false);
  if (init.current === false) {
    subscribe(setState);
    init.current = true;
  }
  useEffect(onChange, [state]);
  return <>{children(state)}</>;
};

export { OverlaySubscriber };
