import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import './App.css';

import AuthLayout from './components/layouts/AuthLayout';
import Login from './components/pages/before-login/Login';
import Register from './components/pages/before-login/Register';
import MasterLayout from './components/layouts/MasterLayout';
import Tasks from './components/pages/after-login/Task/Tasks';
import PageNotFound from './components/pages/page-not-found';
import LoaderLayout from './components/layouts/LoaderLayout';

const router = createBrowserRouter([
  {
    path: '',
    element: <AuthLayout />,
    children: [
      { path: '', element: <Navigate to="login" />, index: true },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: 'tasks',
    element: <MasterLayout />,
    children: [{ path: '', element: <Tasks /> }],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<LoaderLayout />} />;
}

export default App;
