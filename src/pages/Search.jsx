import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { auth } from '../firebase';
import MainLayout from '../layouts/MainLayout';

const Home = () => {



  return (
    <MainLayout>
      <div>
        {/* Searchbar Section */}
        <div></div>
        {/* Result Section */}

        <div></div>
        {/* Pagination Section */}
        <div></div>
      </div>
    </MainLayout >


  );
};

export default Home;
