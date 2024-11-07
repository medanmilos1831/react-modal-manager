import { ReactNode, useContext, useRef, useState } from 'react';
import { OverlayContext } from './OverlayContext';

const OverlayHandler = ({
  children,
}: {
  children: (open: any) => ReactNode;
}) => {
  const { setHandler, ...rest } = useContext(OverlayContext)!;
  const [open, setOpen] = useState(function () {
    let map: { [key: string]: boolean } = {};
    Object.keys(rest.overlaysMap).forEach((overlayName) => {
      map[overlayName] = false;
    });
    return map;
  });

  const init = useRef(false);
  if (init.current === false) {
    setHandler(setOpen);
    init.current = true;
  }
  return <>{children(open)}</>;
};

export { OverlayHandler };
