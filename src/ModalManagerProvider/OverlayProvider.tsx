import { PropsWithChildren, useContext, useState } from 'react';
import { OverlayHandler } from './OverlayHandler';
import { OverlayContext } from './OverlayContext';
import { OverlayService } from './OverlayService';
import { IOverlay } from './types';
function OverlayProvider<T extends IOverlay<any>[]>({
  children,
  overlays,
}: PropsWithChildren<{
  overlays: T;
}>) {
  const [service, _] = useState(init);
  function init() {
    return new OverlayService(overlays);
  }
  return (
    <div>
      <OverlayContext.Provider value={service}>
        <>
          <OverlayHandler>
            {(open) => {
              const { overlaysMap } = service;
              console.log('OPNE', open);
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
          </OverlayHandler>
        </>
      </OverlayContext.Provider>
    </div>
  );
}
const useOverlay = () => {
  const { open, close } = useContext(OverlayContext)!;
  return {
    open,
    close,
  };
};

export { OverlayProvider, useOverlay };