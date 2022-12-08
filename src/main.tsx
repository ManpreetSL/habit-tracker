import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import ErrorPage from './views/ErrorPage';
import About from './views/About';
import Profile, { loader as profileLoader } from './views/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/about/',
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profile/:id',
    element: <Profile />,
    loader: profileLoader,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
