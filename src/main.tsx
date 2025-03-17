import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './store';
import { MainPage, ReactHookFormPage, UncontrolledFormPage } from './pages';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'uncontrolled-form',
        element: <UncontrolledFormPage />,
      },
      {
        path: 'hook-form',
        element: <ReactHookFormPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
