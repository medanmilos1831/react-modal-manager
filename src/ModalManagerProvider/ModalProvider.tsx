import { PropsWithChildren, useContext } from 'react';
import { ModalContext } from './ModalContext';
import { IState } from './types';
import { ModalService } from './ModalService';
import { ModalController } from './ModalController';

const ModalProvider = ({
  children,
  modalRender,
}: PropsWithChildren<{ modalRender: (state: IState) => JSX.Element }>) => {
  return (
    <div>
      <ModalContext.Provider value={ModalService.getInstance()}>
        <>
          {children}
          <ModalController modalRender={modalRender} />
        </>
      </ModalContext.Provider>
    </div>
  );
};

const useModal = () => {
  const ctx = useContext(ModalContext)!;
  return ctx;
};

export { ModalProvider, useModal };
