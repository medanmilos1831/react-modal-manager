import { Button, Form, Input, Modal } from 'antd';
import {
  ModalManagerProvider,
  useModalManager,
} from 'src/ModalManagerProvider';

const ModalComponent = ({ values }: any) => {
  console.log('values', values);
  return <>ModalComponent</>;
};

const SomeComponent = () => {
  const { open, close } = useModalManager();
  return (
    <>
      <Form
        onFinish={(values) => {
          open({
            Component: <ModalComponent values={values} />,
            modalConfig: {
              onCancel() {
                close();
              },
            },
          });
        }}
      >
        <Form.Item name={'fname'}>
          <Input placeholder="first name" />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </>
  );
};

const PageThree = () => {
  return (
    <ModalManagerProvider
      modalRender={({ manager }) => {
        return (
          <Modal open={manager.open} {...manager.modalConfig}>
            <>{manager.Component}</>
          </Modal>
        );
      }}
    >
      <SomeComponent />
    </ModalManagerProvider>
  );
};

export { PageThree };
