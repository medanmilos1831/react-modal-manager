import { Drawer, DrawerProps, Modal, ModalProps } from 'antd';
import { OverlayProvider } from '../ModalManagerProvider';
import { HomePage } from '../pages/HomePage';
import { IOverlay } from '../ModalManagerProvider/types';
const App = () => {
  return (
    <OverlayProvider<[IOverlay<ModalProps>, IOverlay<DrawerProps>]>
      overlays={[
        {
          overlayName: 'modal',
          Overlay: ({ open, Element, config }) => {
            return (
              <Modal open={open} {...config}>
                <Element />
              </Modal>
            );
          },
        },
        {
          overlayName: 'drawer',
          Overlay: ({ open, Element, config }) => {
            return (
              <Drawer open={open} {...config}>
                <Element />
              </Drawer>
            );
          },
        },
      ]}
    >
      <div>
        <HomePage />
      </div>
    </OverlayProvider>
  );
};

export { App };
