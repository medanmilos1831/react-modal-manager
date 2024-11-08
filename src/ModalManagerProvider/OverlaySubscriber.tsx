import { ReactNode, useEffect, useRef, useState } from 'react';
import { handlerType } from './types';

const OverlaySubscriber = ({
  children,
  onChange,
  subscribe,
}: {
  children: () => ReactNode;
  onChange: () => () => void;
  subscribe: (handler: handlerType) => void;
}) => {
  const [_, update] = useState(0);
  const init = useRef(false);
  if (init.current === false) {
    subscribe(update);
    init.current = true;
  }
  useEffect(onChange, [_]);
  return <>{children()}</>;
};

export { OverlaySubscriber };
