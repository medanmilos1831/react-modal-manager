import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { ModalContext } from './ModalContext';

const Contoller = ({ children }: { children: (open: any) => ReactNode }) => {
  const { setHandler, ...rest } = useContext(ModalContext)!;
  const [open, setOpen] = useState(i);
  function i() {
    let r: any = {};
    rest.overlays.forEach((i: any) => {
      r[i.elementName] = false;
    });
    return r;
  }
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
