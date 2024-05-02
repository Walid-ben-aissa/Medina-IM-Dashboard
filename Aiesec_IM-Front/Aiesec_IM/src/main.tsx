import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';

import './index.css';

import LeadsCharts from './views/dashboard'
import Login from './views/login';
import Register from './views/register';
import Root from './views/root';

import { Lead } from './types';
import Profile from './views/home';

const leadsData: Lead[] = [
  { id: 1, emailAddress: 'example1@gmail.com', fullName: 'John Doe', internshipInterest: 'Global Volunteer' },
  { id: 2, emailAddress: 'example2@gmail.com', fullName: 'Jane Smith', internshipInterest: 'Global Talent' },
  { id: 3, emailAddress: 'example3@gmail.com', fullName: 'Azza Bousta', internshipInterest: 'Global Talent' },
  { id: 4, emailAddress: 'example4@gmail.com', fullName: 'Samir La7ouel', internshipInterest: 'Global Teacher' },
  { id: 5, emailAddress: 'example5@gmail.com', fullName: 'Karim Khnisii', internshipInterest: 'Global Volunteer' },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Profile />
      },
      {
        path: "login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"dashboard",
        element:<LeadsCharts leads={leadsData}/>
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
