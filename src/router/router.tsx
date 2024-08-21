import { createBrowserRouter } from 'react-router-dom';
import { ProductsPage, PageTwo } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductsPage />,
  },
]);

export { router };
