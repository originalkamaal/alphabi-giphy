import React from 'react';

import Search from './pages/Search';
import Favourite from './pages/Favourite';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Home page - search gif images */}
      <Route path="/" element={<Search />} exact />{' '}
      {/* My Favourites page where all the favourite images will be listed */}
      <Route path="/myfavourites" element={<Favourite />} />
      {/* Login page to login to the app */}
      <Route path="/login" element={<Login />} />
      {/* Register page where users create account */}
      <Route path="/register" element={<SignUp />} />
      {/* Reset Password Page */}
      <Route path="/reset-password" element={<ResetPassword />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
