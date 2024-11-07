import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { ModalContext } from './ModalContext';

const Contoller = ({ children }: { children: (open: any) => ReactNode }) => {
  const { setHandler, ...rest } = useContext(ModalContext)!;
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
  useEffect(() => {
    console.log('OPEEENNNNN', open);
    // if (open === false) {
    //   setConfig(null);
    // }
  }, [open]);
  return <>{children(open)}</>;
};

export { Contoller };
