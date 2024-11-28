import { PropsWithChildren, useContext, useState } from 'react';
import { OverlayContext } from './OverlayContext';
import { OverlayService } from './OverlayService';
import { OverlaySubscriber } from './OverlaySubscriber';

function OverlayProvider({ children }: PropsWithChildren) {
  const [service, _] = useState(init);
  function init() {
    return new OverlayService();
  }

  return (
    <OverlayContext.Provider
      value={{
        service,
      }}
    >
      <>{children}</>
    </OverlayContext.Provider>
  );
}

const useOverlay = () => {
  const { service } = useContext(OverlayContext)!;
  return {
    overlayHandler({
      overlayName,
      open,
      data,
    }: {
      overlayName: string;
      open: boolean;
      data?: any;
    }) {
      service.overlayHandler({
        overlayName,
        open,
        data: data || undefined,
      });
    },
    OverlaySubscriber: ({ overlayName, children }: any) => {
      return (
        <OverlaySubscriber
          subscribe={(handler) => {
            service.addOverlayHandler(overlayName, handler);
          }}
        >
          {(data) => {
            return (
              <>
                {children({
                  status: data,
                  data: service.getData(overlayName),
                })}
              </>
            );
          }}
        </OverlaySubscriber>
      );
    },
  };
};

export { OverlayProvider, useOverlay };
