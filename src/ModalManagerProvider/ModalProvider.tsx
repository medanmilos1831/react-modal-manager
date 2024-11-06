import { PropsWithChildren, useContext, useState } from 'react';
import { ModalContext } from './ModalContext';
import { ModalContoller } from './ModalContoller';
import { ModalService } from './ModalService';
import { modalRenderType } from './types';
function ModalProvider<C = any>({
  children,
  ModalRender,
}: PropsWithChildren<{ ModalRender: modalRenderType<C> }>) {
  const [service, _] = useState(init);
  function init() {
    return new ModalService();
  }
  return (
    <div>
      <ModalContext.Provider value={service}>
        <>
          <ModalContoller>
            {(open) => {
              return (
                <>
                  {children}
                  <ModalRender
                    config={service.config ? service.config : {}}
                    open={open}
                    Element={() => service.modalElement}
                  />
                </>
              );
            }}
          </ModalContoller>
        </>
      </ModalContext.Provider>
    </div>
  );
}
const useModal = () => {
  const { open, close } = useContext(ModalContext)!;
  return {
    open,
    close,
  };
};

export { ModalProvider, useModal };
