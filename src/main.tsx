import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import { Game as AzulGame } from './azul';
import { Game as ConnectGame } from './connect';
import { Game as RicochetGame } from './ricochet';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/connect-4',
        element: <ConnectGame />,
      },
      {
        path: '/ricochet-robot',
        element: <RicochetGame />,
      },
      {
        path: '/azul',
        element: <AzulGame />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
