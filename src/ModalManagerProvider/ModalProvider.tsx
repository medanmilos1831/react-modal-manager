import { PropsWithChildren, useContext, useState } from 'react';
import { Contoller } from './Contoller';
import { ModalContext } from './ModalContext';
import { ModalService } from './ModalService';
import { IOverlay, modalRenderType } from './types';
function ModalProvider<C = any>({
  children,
  ModalRender,
  overlays,
}: PropsWithChildren<{
  ModalRender: modalRenderType<C>;
  overlays: IOverlay[];
}>) {
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
                  {overlays.map(({ overlayName, OverlayElement }) => {
                    return (
                      <OverlayElement
                        config={
                          service.overlaysMap[overlayName].config
                            ? service.overlaysMap[overlayName].config
                            : {}
                        }
                        open={open[overlayName]}
                        Element={() =>
                          service.overlaysMap[overlayName].overlayElement
                        }
                      />
                    );
                  })}
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
