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
          elementName: 'modal',
          ModalRender: ({ open, Element, config }: any) => {
            console.log('config', config);
            return (
              <Modal open={open} {...config}>
                <Element />
              </Modal>
            );
          },
        },
        {
          elementName: 'drawer',
          ModalRender: ({ open, Element, config }: any) => {
            console.log('config', config);
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
