import { Modal } from 'antd';
import { ModalProvider } from '../ModalManagerProvider';
import { HomePage } from '../pages/HomePage';
const App = () => {
  return (
    <ModalProvider
      ModalRender={({ open, Element, config }: any) => {
        console.log('ssssss', config);
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
