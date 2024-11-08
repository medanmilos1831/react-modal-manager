import { PropsWithChildren, useContext, useState } from 'react';
import { OverlayContext } from './OverlayContext';
import { OverlayService } from './OverlayService';
import { IOverlayItem } from './types';
import { OverlaySubscriber } from './OverlaySubscriber';
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
    <OverlayContext.Provider
      value={{
        open: service.open,
        close: service.close,
      }}
    >
      <>
        {children}
        <>
          {Object.keys(service.overlaysMap).map((overlayName) => {
            return (
              <OverlaySubscriber
                onChange={service.overlaySubscriberOnChange(overlayName)}
                subscribe={(handler) => {
                  service.subscribe(overlayName, handler);
                }}
                initState={service.overlaysMap[overlayName]}
              >
                {({ config, visible, overlayInnerElement, Overlay }) => {
                  return (
                    <Overlay
                      config={config || {}}
                      open={visible}
                      Element={() => overlayInnerElement}
                    />
                  );
                }}
              </OverlaySubscriber>
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
