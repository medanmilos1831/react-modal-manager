import { PropsWithChildren, useContext, useState } from 'react';
import { ModalManagerContext } from './ModalManagerContext';

const ModalManagerProvider = ({
  children,
  modalRender,
}: PropsWithChildren<{ modalRender: any }>) => {
  const [manager, setManager] = useState<any>({
    open: false,
    Component: null,
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

const ModalManagerHandler = ({
  render,
}: {
  render: (obj: {
    open: (params: { Component: (props: any) => JSX.Element }) => void;
  }) => JSX.Element;
}) => {
  const { setManager } = useContext(ModalManagerContext);
  return (
    <>
      {render({
        open: ({ Component }: any) =>
          setManager((prev: any) => {
            return {
              ...prev,
              open: true,
              Component,
            };
          }),
      })}
    </>
  );
};

export { ModalManagerProvider, ModalManagerHandler };
