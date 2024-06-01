import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Compnents/Layouts/Main.jsx';
import Login from './Pages/Login/Login.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import ErrorPage from './Pages/Error/ErrorPage.jsx';
import JoinAsEmployee from './Pages/Employee/JoinAsEmployee.jsx';
import { HelmetProvider } from 'react-helmet-async';
import JoinAsHr from './Pages/Hr/JoinAsHr.jsx';
import Home from './Pages/Home/Home.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/join-as-employee',
        element: <JoinAsEmployee></JoinAsEmployee>
      },
      {
        path: '/join-as-hr',
        element: <JoinAsHr></JoinAsHr>
      },
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster></Toaster>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
