import { DrawerProps, ModalProps } from 'antd';
import { useOverlay } from '../OverlayProvider';
const ModalElement = ({ fname }: { fname: string }) => {
  return <>Element</>;
};
const HomePage = () => {
  const { open, close } = useOverlay();
  return (
    <div>
      <span>Home page</span>
      <button
        onClick={() => {
          open<ModalProps>('moddsdal', <ModalElement fname="Pera" />, {
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
          open<ModalProps>('modal', <ModalElement fname="Pera" />, {
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
          open<DrawerProps>('drawer', <ModalElement fname="Pera" />, {
            closable: true,
            width: 200,
          });
        }}
      >
        drawer
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
