import { PropsWithChildren, useContext, useState } from 'react';
import { Contoller } from './Contoller';
import { ModalContext } from './ModalContext';
import { ModalService } from './ModalService';
import { IOverlay } from './types';
function ModalProvider<T extends IOverlay<any>[] | any[]>({
  children,
  overlays,
}: PropsWithChildren<{
  overlays: T;
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
              const { overlaysMap } = service;
              return (
                <>
                  {children}
                  {overlays.map(({ overlayName, Overlay }) => {
                    return (
                      <Overlay
                        config={overlaysMap[overlayName].config || {}}
                        open={open[overlayName]}
                        Element={() => overlaysMap[overlayName].overlayElement}
                      />
                    );
                  })}
                </>
              );
            }}
          </Contoller>
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
