import { Modal, ModalProps } from 'antd';
import { ModalManager, ModalManagerProvider } from 'src/ModalManagerProvider';

const Nesto = () => {
  return <>Nesto</>;
};

const PageTwo = () => {
  let x = 1;
  return (
    <ModalManagerProvider
      modalRender={({ manager }) => {
        return (
          <Modal open={manager.open} {...manager.modalConfig}>
            {manager.Component}
          </Modal>
        );
      }}
    >
      <div>
        PageTwo
        <ModalManager<ModalProps>>
          {({ open, close }) => {
            return (
              <button
                type="button"
                onClick={() => {
                  x = x + 1;
                  if (x === 3) {
                    open({
                      Component: <Nesto />,
                      modalConfig: {
                        footer: false,
                      },
                    });
                  }
                }}
              >
                open modal
              </button>
            );
          }}
        </ModalManager>
      </div>
    </ModalManagerProvider>
  );
};

export { PageTwo };
