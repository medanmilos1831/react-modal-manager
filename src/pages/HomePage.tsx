import { ModalProps } from 'antd';
import { useOverlay } from '../ModalManagerProvider';
const ModalElement = () => {
  return <>Element</>;
};
const HomePage = () => {
  console.log('RENDER HOME PAGE');
  const { open, close } = useOverlay();
  return (
    <div>
      <span>Home page</span>
      <button
        onClick={() => {
          open('modal', <ModalElement />, {
            closable: true,
            onCancel(e: any) {
              close('modal');
            },
            width: 700,
          });
        }}
      >
        click me o 700
      </button>
      <button
        onClick={() => {
          open<ModalProps>('modal', <ModalElement />, {
            closable: true,
            onCancel(e: any) {
              close('modal');
            },
            width: 200,
          });
        }}
      >
        click me o 500
      </button>

      <button
        onClick={() => {
          close('modal');
        }}
      >
        click me c
      </button>
    </div>
  );
};

export { HomePage };
