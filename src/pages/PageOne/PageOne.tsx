import { ModalProps } from 'antd';
import { useLocation } from 'react-router-dom';
import { useModal } from 'src/ModalManagerProvider';

const Hello = (props: any) => {
  const location = useLocation();
  return <>Hello</>;
};

const World = () => {
  console.log('render World');
  return <>World</>;
};
const PageOne = () => {
  console.log('render');
  const { openModal, closeModal } = useModal();
  const modalOne = () => {
    openModal<ModalProps>(<Hello fname="milos" />, {
      footer: null,
      onCancel: closeModal,
      width: 100,
    });
  };

  const modalTwo = () => {
    openModal<ModalProps>(<Hello fname="milos" />, {
      footer: null,
      onCancel: closeModal,
      width: 700,
    });
  };
  return (
    <div>
      <button onClick={modalOne}>m1</button>
      <button onClick={modalTwo}>m2</button>
    </div>
  );
};

export { PageOne };
