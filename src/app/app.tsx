import { RouterProvider } from 'react-router-dom';
import { router } from '../router';
import { Modal } from 'antd';
import { ModalManagerProvider } from 'src/ModalManagerProvider';

const App = () => {
  return (
    <>
      <ModalManagerProvider
        modalRender={({ manager }: any) => {
          const { Component } = manager;
          return (
            <Modal open={manager.open}>
              {/* <Component /> */}
              {Component}
            </Modal>
          );
        }}
      >
        <RouterProvider router={router} />
      </ModalManagerProvider>
    </>
  );
};

export { App };
