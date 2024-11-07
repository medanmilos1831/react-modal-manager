import { Drawer, Modal, ModalProps } from 'antd';
import { ModalProvider } from '../ModalManagerProvider';
import { HomePage } from '../pages/HomePage';
const App = () => {
  return (
    <ModalProvider<ModalProps>
      ModalRender={({ open, Element, config }) => {
        return (
          <Modal open={open} {...config}>
            <Element />
          </Modal>
        );
      }}
      overlays={[
        {
          overlayName: 'modal',
          OverlayElement: ({ open, Element, config }: any) => {
            return (
              <Modal open={open} {...config}>
                <Element />
              </Modal>
            );
          },
        },
        {
          overlayName: 'drawer',
          OverlayElement: ({ open, Element, config }: any) => {
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
