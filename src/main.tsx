import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './index.css'

import { PageError } from './pages/err/error-page'; 
import { Home } from './pages/home/home';
import { PageDetails } from './pages/details/page-index';
import { Layout } from './assets/components/layout';

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home />,
        errorElement: <PageError />,
      },
      {
        path: "*",
        element: <PageError />,
      },
      {
        path: "/detail/:cripto",
        element: <PageDetails />,
        errorElement: <PageError />,
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
