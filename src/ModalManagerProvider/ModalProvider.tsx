import { PropsWithChildren, useContext, useState } from 'react';
import { ModalContext } from './ModalContext';
import { ModalContoller } from './ModalContoller';
import { ModalService } from './ModalService';
const ModalProvider = ({
  children,
  ModalRender,
}: PropsWithChildren<{ ModalRender: any }>) => {
  const [service, _] = useState(init);
  function init() {
    return new ModalService();
  }
  return (
    <div>
      <ModalContext.Provider value={service}>
        <>
          <ModalContoller>
            {(open, Element, config) => {
              return (
                <>
                  {children}
                  <ModalRender
                    config={config}
                    open={open}
                    Element={() => Element}
                  />
                </>
              );
            }}
          </ModalContoller>
        </>
      </ModalContext.Provider>
    </div>
  );
};
const useModal = () => {
  const { open, close } = useContext(ModalContext)!;
  return {
    open,
    close,
  };
};

export { ModalProvider, useModal };
