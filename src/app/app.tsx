import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Modal, Space } from 'antd';
import { ModalManagerProvider } from 'src/ModalManagerProvider';
import { PageTwo, ProductsPage } from 'src/pages';

export const router = () =>
  createBrowserRouter([
    {
      path: '/',
      element: (
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
            </Space>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      ),
      children: [
        {
          index: true,
          element: <ProductsPage />,
        },
        {
          path: '/two',
          element: <PageTwo />,
        },
      ],
    },
  ]);

const App = () => {
  return (
    <>
      {/* <ModalManagerProvider
        modalRender={({ manager }) => {
          return (
            <Modal open={manager.open} {...manager.modalConfig}>
              {manager.Component}
            </Modal>
          );
        }}
      > */}
      <RouterProvider router={router()} />
      {/* </ModalManagerProvider> */}
    </>
  );
};

export { App };
