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
import AddAsset from './Pages/HrPages/AddAsset.jsx';
import AssetList from './Pages/HrPages/AssetList.jsx';
import RequestAsset from './Pages/EmployeePages/RequestAsset.jsx';
import UpdateAsset from './Compnents/HrComponents/UpdateAsset.jsx';
import MyRequestedAsset from './Compnents/EmployeComponents/MyRequestedAsset.jsx';
import AllRequests from './Pages/HrPages/AllRequests.jsx';
import AddEmployee from './Pages/HrPages/AddEmployee.jsx';
import MyEmployeeList from './Pages/HrPages/MyEmployeeList.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import MyTeam from './Pages/EmployeePages/MyTeam.jsx';
import Payment from './Pages/Payment/Payment.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import HrRoute from './PrivateRoute/HrRoute.jsx';
import EmployeeRoute from './PrivateRoute/EmployeeRoute.jsx';

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
      {
        path:'/add-asset',
        element:<PrivateRoute><HrRoute><AddAsset></AddAsset></HrRoute></PrivateRoute>
      },
      {
        path:'/asset-list',
        element:<PrivateRoute><HrRoute><AssetList></AssetList></HrRoute></PrivateRoute>
      },
      {
        path:'/request-asset',
        element:<PrivateRoute><EmployeeRoute><RequestAsset></RequestAsset></EmployeeRoute></PrivateRoute>
      },
      {
        path:'/asset-update/:id',
        element: <PrivateRoute><UpdateAsset></UpdateAsset></PrivateRoute>
      },
      {
        path:'/my-request-assets',
        element:<PrivateRoute><EmployeeRoute><MyRequestedAsset></MyRequestedAsset></EmployeeRoute></PrivateRoute>
      },
      {
        path:'/asset-request',
        element:<PrivateRoute><HrRoute><AllRequests></AllRequests></HrRoute></PrivateRoute>
      },
      {
        path:'/add-employee',
        element:<PrivateRoute><HrRoute><AddEmployee></AddEmployee></HrRoute></PrivateRoute>
      },
      {
        path:'/my-employee-list',
        element:<PrivateRoute><HrRoute><MyEmployeeList></MyEmployeeList></HrRoute></PrivateRoute>
      },
      {
        path:'/profile',
        element:<PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path:'my-team',
        element:<PrivateRoute><MyTeam></MyTeam></PrivateRoute>
      },
      {
        path:'/payment',
        element:<PrivateRoute><Payment></Payment></PrivateRoute>
      }
  
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  
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
