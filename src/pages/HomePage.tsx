import { ModalProps } from 'antd';
import { useModal } from '../ModalManagerProvider';
const ModalElement = () => {
  return <>Element</>;
};
const HomePage = () => {
  console.log('RENDER HOME PAGE');
  const { open, close } = useModal();
  return (
    <div>
      <span>Home page</span>
      <button
        onClick={() => {
          open<ModalProps>(<ModalElement />, {
            closable: true,
            onCancel(e) {
              close();
            },
          });
        }}
      >
        click me o
      </button>

      <button
        onClick={() => {
          close();
        }}
      >
        click me c
      </button>
    </div>
  );
};

export { HomePage };
