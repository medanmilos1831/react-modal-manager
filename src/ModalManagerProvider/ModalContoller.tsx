import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { ModalContext } from './ModalContext';

const ModalContoller = ({
  children,
}: {
  children: (open: boolean) => ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const { setHandler } = useContext(ModalContext)!;
  const init = useRef(false);
  if (init.current === false) {
    // setHandler(setOpen);
    init.current = true;
  }
  useEffect(() => {
    if (open === false) {
      // setConfig(null);
    }
  }, [open]);
  return <>{children(open)}</>;
};

export { ModalContoller };
