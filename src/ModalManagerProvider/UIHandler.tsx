import { ReactNode, useContext, useRef, useState } from 'react';
import { OverlayContext } from './OverlayContext';

const UIHandler = ({ children }: { children: (open: any) => ReactNode }) => {
  const { setHandler } = useContext(OverlayContext)!;
  const [_, update] = useState(0);
  const init = useRef(false);
  if (init.current === false) {
    setHandler(update);
    init.current = true;
  }
  return <>{children(open)}</>;
};

export { UIHandler };
