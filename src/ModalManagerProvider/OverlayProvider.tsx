import { PropsWithChildren, useContext, useState } from 'react';
import { UISubscriber } from './UISubscriber';
import { OverlayContext } from './OverlayContext';
import { OverlayService } from './OverlayService';
import { IOverlayItem } from './types';
function OverlayProvider<T extends IOverlayItem<any>[]>({
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
          {Object.keys(service.overlaysMap!).map((overlayName) => {
            return (
              <UISubscriber overlayName={overlayName}>
                {({ Overlay, config, visible, overlayElement }) => {
                  return (
                    <Overlay
                      config={config || {}}
                      open={visible}
                      Element={() => overlayElement}
                    />
                  );
                }}
              </UISubscriber>
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
