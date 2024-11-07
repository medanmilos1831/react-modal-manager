import { PropsWithChildren, useContext, useState } from 'react';
import { Contoller } from './Contoller';
import { ModalContext } from './ModalContext';
import { ModalService } from './ModalService';
import { modalRenderType } from './types';
function ModalProvider<C = any>({
  children,
  ModalRender,
  overlays,
}: PropsWithChildren<{ ModalRender: modalRenderType<C>; overlays: any[] }>) {
  const [service, _] = useState(init);
  function init() {
    return new ModalService(overlays);
  }
  return (
    <div>
      <ModalContext.Provider value={service}>
        <>
          <Contoller>
            {(open) => {
              return (
                <>
                  {children}
                  {service.overlays.map(({ elementName, ModalRender }: any) => {
                    console.log('service', service);
                    return (
                      <ModalRender
                        config={
                          service.elementsService[elementName].config
                            ? service.elementsService[elementName].config
                            : {}
                        }
                        open={open[elementName]}
                        Element={() =>
                          service.elementsService[elementName].modalElement
                        }
                      />
                    );
                  })}
                  {/* <ModalRender
                    config={service.config ? service.config : {}}
                    open={open}
                    Element={() => service.modalElement}
                  /> */}
                </>
              );
            }}
          </Contoller>
          {/* <ModalContoller>
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
          </ModalContoller> */}
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
