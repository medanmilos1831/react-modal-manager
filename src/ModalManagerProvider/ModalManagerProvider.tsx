import { PropsWithChildren, useContext, useState } from 'react';
import { ModalManagerContext } from './ModalManagerContext';
import { IManager, IModalManagerHandler, IModalManagerProvider } from './types';

const ModalManagerProvider = ({
  children,
  modalRender,
}: PropsWithChildren<IModalManagerProvider>) => {
  const [manager, setManager] = useState<IManager>({
    open: false,
    Component: null,
    modalConfig: {},
  });
  return (
    <ModalManagerContext.Provider
      value={{
        manager,
        setManager,
      }}
    >
      {children}
      {modalRender({ manager })}
    </ModalManagerContext.Provider>
  );
};

const ModalManagerHandler = <T extends {}>({
  render,
}: IModalManagerHandler<T>) => {
  const obj = useModalManager<T>();
  return <>{render(obj)}</>;
};

const useModalManager = <T extends {}>() => {
  const ctx = useContext(ModalManagerContext)!;
  return {
    open: ({
      Component,
      modalConfig,
    }: {
      Component: JSX.Element | null;
      modalConfig?: T;
    }) =>
      ctx.setManager((prev) => {
        return {
          ...prev,
          open: true,
          Component,
          modalConfig,
        };
      }),
    close: () => {
      ctx.setManager((prev) => {
        return {
          ...prev,
          open: false,
          Component: null,
        };
      });
    },
  };
};

export { ModalManagerProvider, ModalManagerHandler, useModalManager };
