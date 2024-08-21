import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Modal, Space } from 'antd';
import { PageTwo, PageOne } from 'src/pages';
import { PageThree } from 'src/pages/PageThree';

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
              <Link to={'/three'}>Three</Link>
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
