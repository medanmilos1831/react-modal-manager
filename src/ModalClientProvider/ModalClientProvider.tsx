import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ExtendableProps,
  IModalContext,
  IState,
  closeModalType,
  modalRender,
  openModalType,
} from './types';

const ModalContext = createContext<IModalContext | undefined>(undefined);
const ModalClientProvider = ({
  children,
  modal,
}: PropsWithChildren<{ modal: modalRender }>) => {
  const [state, setState] = useState<IState>({
    Component: () => <></>,
    props: {},
    open: false,
  });
  const modalConfigRef = useRef<any>({});
  useEffect(() => {
    if (!state.open) {
      modalConfigRef.current = {};
    }
  }, [state.open]);

  function openModal<T>(
    Component: (props: ExtendableProps<T>) => JSX.Element,
    props?: T,
    modalConfig?: any
  ) {
    modalConfigRef.current = modalConfig ?? {};
    setState((prev: any) => {
      return {
        ...prev,
        Component,
        props: {
          ...props,
          closeModal,
        },
        open: true,
      };
    });
  }
  function closeModal() {
    setState((prev) => {
      return {
        ...prev,
        Component: () => <></>,
        props: {},
        open: false,
      };
    });
  }

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        Modal: modal,
        state,
        modalConfigRef: modalConfigRef.current,
      }}
    >
      <>{children}</>
    </ModalContext.Provider>
  );
};
const ModalHandler = ({
  children,
}: {
  children: (obj: {
    openModal: openModalType;
    closeModal: closeModalType;
  }) => JSX.Element;
}) => {
  const { openModal, closeModal } = useContext(ModalContext)!;
  return (
    <>
      {children({
        openModal,
        closeModal,
      })}
    </>
  );
};

const ModalConsumer = ({
  consumer,
}: {
  consumer: (value: IModalContext | undefined) => JSX.Element;
}) => {
  return (
    <>
      <ModalContext.Consumer>{consumer}</ModalContext.Consumer>
    </>
  );
};

const useModalClient = () => {
  const { openModal, closeModal } = useContext(ModalContext) as IModalContext;
  return {
    openModal,
    closeModal,
  };
};

const Modal = (modalConfig: any) => {
  const { Modal, state, closeModal, modalConfigRef } =
    useContext(ModalContext)!;
  return (
    <Modal
      {...state}
      modalConfig={{
        ...modalConfig,
        ...modalConfigRef,
      }}
      closeModal={closeModal}
    />
  );
};

/**
 * ovo je hadler
 */
ModalClientProvider.ModalHandler = ModalHandler;
/**
 * ovo je modal render koji je definisan kroz modal client provider
 */
ModalClientProvider.Modal = Modal;

export { ModalClientProvider, useModalClient, ModalConsumer };
