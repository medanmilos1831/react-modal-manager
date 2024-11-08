import { ReactNode, useContext, useRef, useState } from 'react';
import { OverlayContext } from './OverlayContext';

const UIHandler = ({
  children,
  overlayName,
}: {
  children: (props: any) => ReactNode;
  overlayName: string;
}) => {
  const { setHandler, overlaysMap } = useContext(OverlayContext)!;
  const [_, update] = useState(0);
  const init = useRef(false);
  if (init.current === false) {
    setHandler(update, overlayName);
    init.current = true;
  }
  return <>{children(overlaysMap[overlayName])}</>;
};

export { UIHandler };
