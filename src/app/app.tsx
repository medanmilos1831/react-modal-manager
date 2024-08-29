import { Modal, Space } from 'antd';
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ModalProvider } from 'src/ModalManagerProvider';
import { PageOne, PageTwo } from 'src/pages';
import { PageThree } from 'src/pages/PageThree';

const Root = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          marginBottom: '2rem',
        }}
      >
        <Space>
          <Link to={'/'}>One</Link>
          <Link to={'/two'}>Two</Link>
          <Link to={'/three'}>Three</Link>
        </Space>
      </div>
      <div>
        <ModalProvider
          modalRender={({ Component, open, modalConfig }) => {
            return (
              <Modal open={open} {...modalConfig}>
                {Component}
              </Modal>
            );
          }}
        >
          <Outlet />
        </ModalProvider>
      </div>
    </div>
  );
};

export const router = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <PageOne />,
        },
        {
          path: '/two',
          element: <PageTwo />,
        },
        {
          path: '/three',
          element: <PageThree />,
        },
      ],
    },
  ]);

const App = () => {
  return (
    <>
      <RouterProvider router={router()} />
    </>
  );
};

export { App };
