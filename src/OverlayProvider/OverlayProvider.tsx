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
    overlayHandler: service.overlayHandler,
    OverlaySubscriber: ({
      overlayName,
      children,
    }: {
      overlayName: string;
      children: (obj: { open: boolean; data: any }) => React.ReactNode;
    }) => {
      return (
        <OverlaySubscriber
          subscribe={(handler) => {
            service.subscribe(overlayName, handler);
          }}
          unsubscribe={() => {
            service.unsubscribe(overlayName);
          }}
        >
          {(data) =>
            children({
              open: data,
              data: service.getData(overlayName),
            })
          }
        </OverlaySubscriber>
      );
    },
  };
};

export { OverlayProvider, useOverlay };
