import { Modal, ModalProps } from 'antd';
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
    >
      <div>
        <HomePage />
      </div>
    </ModalProvider>
  );
};

export { App };
