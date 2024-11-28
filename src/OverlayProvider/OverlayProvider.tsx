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
OverlayProvider.Item = ({
  overlayName,
  children,
}: {
  overlayName: string;
  children: (obj: { open: boolean; data: any }) => React.ReactNode;
}) => {
  const { service } = useContext(OverlayContext)!;
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
          data: service.getOverlayData(overlayName),
        })
      }
    </OverlaySubscriber>
  );
};

const useOverlay = () => {
  const { service } = useContext(OverlayContext)!;
  return service.overlayHandler;
};

export { OverlayProvider, useOverlay };
