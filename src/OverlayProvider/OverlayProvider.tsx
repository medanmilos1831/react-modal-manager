import {
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { OverlayContext } from './OverlayContext';
import { OverlayService } from './OverlayService';

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
  children: (obj: { open: boolean; data: any }) => ReactNode;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const init = useRef(false);
  const { service } = useContext(OverlayContext)!;
  if (init.current === false) {
    service.subscribe(overlayName, {
      setVisible,
      overlayData: undefined,
    });
    init.current = true;
  }

  useEffect(() => {
    return () => {
      service.unsubscribe(overlayName);
    };
  }, []);
  return children({
    open: visible,
    data: service.getOverlayData(overlayName),
  });
};

const useOverlay = () => {
  const { service } = useContext(OverlayContext)!;
  return service.overlayHandler;
};

export { OverlayProvider, useOverlay };
