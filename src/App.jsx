import React from 'react';

import Search from './pages/Search';
import Favourite from './pages/Favourite';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AuthLayout from './layouts/AuthLayout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Search />} exact />
      <Route path="/myfavourites" element={<Favourite />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
