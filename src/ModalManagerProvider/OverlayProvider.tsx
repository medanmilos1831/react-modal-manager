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
    <OverlayContext.Provider value={service}>
      <>
        {children}
        <>
          {Object.keys(service.overlaysMap).map((overlayName) => {
            return (
              <UIHandler overlayName={overlayName}>
                {({ Overlay, config, visible, overlayElement }) => {
                  return (
                    <Overlay
                      config={config || {}}
                      open={visible}
                      Element={() => overlayElement}
                    />
                  );
                }}
              </UIHandler>
            );
          })}
        </>
      </>
    </OverlayContext.Provider>
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
