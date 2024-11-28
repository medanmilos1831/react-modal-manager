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
    </div>
  );
};

export { HomePage };
