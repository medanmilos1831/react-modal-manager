import { ReactNode, useContext, useRef, useState } from 'react';
import { ModalContext } from './ModalContext';
import { IModalService } from './types';

const ModalContoller = ({
  children,
}: {
  children: (
    open: boolean,
    modalElement: IModalService['modalElement'],
    config: unknown
  ) => ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const context = useContext(ModalContext)!;
  const init = useRef(false);
  if (init.current === false) {
    context.setHandler(setOpen);
    init.current = true;
  }
  return <>{children(open, context.modalElement, context.config)}</>;
};

export { ModalContoller };
