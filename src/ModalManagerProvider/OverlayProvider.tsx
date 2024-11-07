import { PropsWithChildren, useContext, useState } from 'react';
import { UIHandler } from './UIHandler';
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
          <UIHandler>
            {() => {
              const { overlaysMap } = service;
              return (
                <>
                  {children}
                  {overlays.map(({ overlayName, Overlay }) => {
                    const item = overlaysMap[overlayName];
                    return (
                      <Overlay
                        config={item.config || {}}
                        open={item.visible}
                        Element={() => item.overlayElement}
                      />
                    );
                  })}
                </>
              );
            }}
          </UIHandler>
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
