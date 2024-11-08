import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { OverlayContext } from './OverlayContext';

const UISubscriber = ({
  children,
  overlayName,
}: {
  children: (props: any) => ReactNode;
  overlayName: string;
}) => {
  const { subscribe, overlaysMap } = useContext(OverlayContext)!;
  const [_, update] = useState(0);
  const init = useRef(false);
  if (init.current === false) {
    subscribe(overlayName, update);
    init.current = true;
  }
  useEffect(() => {
    return () => {
      if (
        !overlaysMap[overlayName].visible &&
        (overlaysMap[overlayName].config ||
          overlaysMap[overlayName].overlayInnerElement)
      ) {
        overlaysMap[overlayName].config = null;
        overlaysMap[overlayName].overlayInnerElement = null;
      }
    };
  }, [_]);
  return <>{children(overlaysMap[overlayName])}</>;
};

export { UISubscriber };
