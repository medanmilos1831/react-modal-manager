import { Modal } from 'antd';
import { OverlayProvider, useOverlay } from '../OverlayProvider';

const HomePage = () => {
  const overlayHandler = useOverlay();
  return (
    <div>
      <div>
        <h1>Home Page</h1>
      </div>
      <OverlayProvider.Item overlayName="pera">
        {({ open }) => {
          return (
            <Modal
              open={open}
              onCancel={() => {
                overlayHandler({
                  overlayName: 'pera',
                  open: false,
                });
              }}
            >
              <>pera</>
            </Modal>
          );
        }}
      </OverlayProvider.Item>
      <OverlayProvider.Item overlayName="zika">
        {(data) => {
          return (
            <Modal
              open={data.open}
              destroyOnClose
              onCancel={() => {
                overlayHandler({
                  overlayName: 'zika',
                  open: false,
                });
              }}
              width={300}
            >
              <>zika</>
            </Modal>
          );
        }}
      </OverlayProvider.Item>
      <button
        onClick={() => {
          overlayHandler({
            overlayName: 'pera',
            open: true,
            overlayData: {
              props: {
                id: 1,
              },
            },
          });
        }}
      >
        click me o pera
      </button>
      <button
        onClick={() => {
          overlayHandler({
            overlayName: 'zika',
            open: true,
            overlayData: {
              props: {
                id: undefined,
              },
              open: true,
            },
          });
        }}
      >
        click me zika
      </button>
      <button onClick={() => {}}>drawer</button>

      <button
        onClick={() => {
          // close('modal');
        }}
      >
        click me c
      </button>
    </div>
  );
};

export { HomePage };
