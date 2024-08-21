import { RouterProvider } from 'react-router-dom';
import { ModalClientProvider } from '../ModalClientProvider';
import { router } from '../router';
import { Modal } from 'antd';

const App = () => {
  return (
    <ModalClientProvider
      modal={({ open, Component, props, modalConfig, closeModal }) => {
        return (
          <Modal
            open={open}
            closable={true}
            onCancel={() => {
              closeModal();
            }}
            footer={null}
            destroyOnClose={true}
            width={1000}
            {...modalConfig}
          >
            <Component {...props} />
          </Modal>
        );
      }}
    >
      <RouterProvider router={router} />
    </ModalClientProvider>
  );
};

export { App };
