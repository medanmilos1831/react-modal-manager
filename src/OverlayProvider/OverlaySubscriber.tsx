import { ReactNode, useEffect, useRef, useState } from 'react';
import { entryType } from './types';

const OverlaySubscriber = ({
  children,
  subscribe,
  unsubscribe,
}: {
  children: (state: boolean) => ReactNode;
  subscribe: (entry: entryType) => void;
  unsubscribe: () => void;
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const init = useRef(false);

  if (init.current === false) {
    subscribe({
      setVisible,
      data: undefined,
    });
    init.current = true;
  }

  useEffect(() => {
    return () => {
      unsubscribe();
      // if (state.visible && (state.config || state.overlayInnerElement)) {
      //   state.config = null;
      //   state.overlayInnerElement = null;
      // }
    };
  }, []);

  return <>{children(visible)}</>;
};

export { OverlaySubscriber };
