import { Modal } from 'antd';
import { useOverlay } from '../OverlayProvider';
const HomePage = () => {
  const { OverlaySubscriber, overlayHandler } = useOverlay();
  return (
    <div>
      <div>
        <h1>Home Page</h1>
      </div>
      <OverlaySubscriber overlayName="pera">
        {(data: any) => {
          console.log('render pera', data);
          return (
            <Modal
              open={data.status}
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
      </OverlaySubscriber>
      <OverlaySubscriber overlayName="zika">
        {(data: any) => {
          console.log('render zika');
          return (
            <Modal
              open={data.status}
              destroyOnClose
              onCancel={() => {
                console.log('ovo se desilo');
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
      </OverlaySubscriber>
      <button
        onClick={() => {
          overlayHandler({
            overlayName: 'pera',
            open: true,
            // data: {
            //   props: {
            //     id: 1,
            //   },
            // },
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
            data: {
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
