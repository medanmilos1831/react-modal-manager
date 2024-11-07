import { ReactNode, useContext, useRef, useState } from 'react';
import { OverlayContext } from './OverlayContext';

const UIHandler = ({
  children,
  overlayName,
}: {
  children: () => ReactNode;
  overlayName: string;
}) => {
  const { setHandler } = useContext(OverlayContext)!;
  const [_, update] = useState(0);
  const init = useRef(false);
  if (init.current === false) {
    setHandler(update, overlayName);
    init.current = true;
  }
  return <>{children()}</>;
};

export { UIHandler };
