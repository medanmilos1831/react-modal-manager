import { Modal, ModalProps } from 'antd';
import {
  ModalManagerHandler,
  ModalManagerProvider,
} from 'src/ModalManagerProvider';

const Hello = () => {
  console.log('render Hello');
  return <>Hello</>;
};

const World = () => {
  console.log('render World');
  return <>World</>;
};
const ProductsPage = () => {
  console.log('render PAGE');
  return (
    <>
      <ModalManagerProvider
        modalRender={({ manager }) => {
          return (
            <Modal open={manager.open} {...manager.modalConfig}>
              {manager.Component}
            </Modal>
          );
        }}
      >
        <ModalManagerHandler<ModalProps>
          render={({ open, close }) => {
            return (
              <button
                type="button"
                onClick={() => {
                  open({
                    Component: <Hello />,
                    modalConfig: {
                      width: 100,
                      footer: () => <>pera</>,
                      onCancel(e) {
                        close();
                      },
                    },
                  });
                }}
              >
                open modal helloo modal
              </button>
            );
          }}
        ></ModalManagerHandler>

        <ModalManagerHandler<ModalProps>
          render={({ open, close }) => {
            return (
              <button
                type="button"
                onClick={() => {
                  open({
                    Component: <World />,
                    modalConfig: {
                      width: 700,
                      onCancel(e) {
                        close();
                      },
                    },
                  });
                }}
              >
                open modal World modal
              </button>
            );
          }}
        ></ModalManagerHandler>
      </ModalManagerProvider>
    </>
  );
};

export { ProductsPage };
