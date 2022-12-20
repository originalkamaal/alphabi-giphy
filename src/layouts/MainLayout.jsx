import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner'

// this file is created to customize the pages other than auth for eg Home, MyFavourite etc
const MainLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(() => {
    // if user is not logged in navigating to login page
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    loading ? <LoadingSpinner /> :
      <>
        <Header user={user} />
        {children}
      </>
  );
};

export default MainLayout;
