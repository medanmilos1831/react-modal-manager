import { useContext, useState, useEffect } from 'react';
import { IState } from './types';
import { ModalContext } from './ModalContext';

const ModalController = ({
  modalRender,
}: {
  modalRender: (state: IState) => JSX.Element;
}) => {
  const service = useContext(ModalContext);
  const [state, setState] = useState<IState>({
    open: false,
    Component: null,
    modalConfig: {},
  });
  useEffect(() => {
    service!.register({
      setState,
    });
  }, [state, setState]);
  return <>{modalRender({ ...state })}</>;
};

export { ModalController };
