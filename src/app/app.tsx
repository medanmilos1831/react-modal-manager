import { Drawer, DrawerProps, Modal, ModalProps } from 'antd';
import { ModalProvider } from '../ModalManagerProvider';
import { HomePage } from '../pages/HomePage';
import { IOverlay } from '../ModalManagerProvider/types';
const App = () => {
  return (
    <ModalProvider<[IOverlay<ModalProps>, IOverlay<DrawerProps>]>
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
    </ModalProvider>
  );
};

export { App };
