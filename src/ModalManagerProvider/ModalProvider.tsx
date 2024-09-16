import { PropsWithChildren, useContext } from 'react';
import { ModalContext } from './ModalContext';
import { IState } from './types';
import { ModalService } from './ModalService';
import { ModalController } from './ModalController';

/**
 * ModalProvider component.
 *
 * This component is responsible for providing modal service to its children
 * and rendering a modal controller.
 *
 * @param {PropsWithChildren<{ modalRender: (state: IState) => JSX.Element }>} props
 * @param {Function} props.modalRender - A function that renders the modal based on the current state.
 * @param {React.ReactNode} props.children - Child components that will consume the modal service.
 *
 * @returns {JSX.Element} The ModalProvider component with context and modal controller.
 */
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

/**
 * Custom hook to access the modal context.
 *
 * This hook provides access to the modal service instance from the context.
 *
 * @returns {ModalService} The modal service instance.
 */
const useModal = () => {
  const ctx = useContext(ModalContext)!;
  return ctx;
};

export { ModalProvider, useModal };
