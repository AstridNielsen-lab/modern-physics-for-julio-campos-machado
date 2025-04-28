import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MathJaxContext } from 'better-react-mathjax';
import { Home } from './pages/Home';
import { Theory } from './pages/Theory';
import { Simulations } from './pages/Simulations';
import './index.css';

const mathJaxConfig = {
  tex: {
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
    packages: ['base', 'ams', 'noerrors', 'noundefined']
  },
  svg: {
    fontCache: 'global'
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/teoria/:id',
    element: <Theory />,
  },
  {
    path: '/simulacoes',
    element: <Simulations />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MathJaxContext config={mathJaxConfig}>
      <RouterProvider router={router} />
    </MathJaxContext>
  </StrictMode>
);